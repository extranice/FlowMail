
// Using a global object to store our state, observers, and listeners
// This helps with cleanup and prevents polluting the window object.
window.flowMail = window.flowMail || {};

/**
 * Generates and injects all CSS overrides based on user settings.
 * @param {object} settings - The user's settings object.
 */
function injectCss(settings) {
  const styleId = 'flowmail-styles';
  let styleElement = document.getElementById(styleId);
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  let css = '';

  // --- Visual Clutter ---
  if (settings.visualClutter?.ads) {
    // Gmail's right-side bar for ads, calendar, etc.
    css += `div.Bu.y3[role="complementary"] { display: none !important; }`;
  }
  if (settings.visualClutter?.extraButtons) {
    // Hide Meet, Chat, and Spaces from the main navigation
    css += `div[data-tooltip="Meet"], div[data-tooltip="Chat"], div[data-tooltip="Spaces"] { display: none !important; }`;
  }
  if (settings.visualClutter?.unusedToolbars) {
    // Hide the help, settings, apps menu from the top right
    css += `header#gb div[aria-label="Support"], header#gb div[aria-label^="Settings"], header#gb div[aria-label="Google apps"] { display: none !important; }`;
  }

  // --- Sizing ---
  // Using CSS variables to control widths
  css += `
    :root {
      --flowmail-message-width: ${settings.sizing?.messageWidth || 80}%;
      --flowmail-inbox-list-width: ${settings.sizing?.inboxListWidth || 30}%;
    }
    /* Target the main pane where emails are read */
    div.aYF { max-width: var(--flowmail-message-width) !important; }
    /* Target the list of emails pane */
    div.bkK { width: var(--flowmail-inbox-list-width) !important; }
  `;

  // --- Font Customization ---
  const fontFamily = settings.font?.family && settings.font.family !== 'Default' 
    ? `'${settings.font.family}', sans-serif` 
    : 'inherit';

  css += `
    /* .zA is a common class for email content */
    body, .zA {
      font-family: ${fontFamily} !important;
      font-size: ${settings.font?.size || 14}px !important;
      font-weight: ${settings.font?.weight || 400} !important;
    }
  `;

  // --- Minimalist Views ---
  if (settings.minimalistView?.conversation) {
    // Hide redundant headers and footers in conversation view
    css += `
      .gE, /* Email header with avatar, name, etc. */
      .gB, /* Toolbar above email */
      .adx { /* Bottom ad-like elements */
        display: none !important;
      }
      .hP, .hQ { border: none !important; box-shadow: none !important; } /* Remove card-like styling */
    `;
  }
  if (settings.minimalistView?.compose) {
    // Simplify the compose window
    css += `.aDh { display: none !important; } /* Hide bottom toolbar in compose */`;
  }
  if (settings.minimalistView?.reply) {
     // Simplify the reply box
     css += `div[aria-label="Reply"] .aDh { display: none !important; }`;
  }

  // --- Label Management ---
  if (settings.labels?.compactView) {
    // Reduce padding and margin for labels in the left nav
    css += `.aim .TO, .aim .TO div { height: 20px !important; padding-top: 0 !important; padding-bottom: 0 !important; }`;
  }
  if (settings.labels?.customColors) {
    settings.labels.customColors.forEach(label => {
      // Gmail labels have a data-tooltip with the full label path. We target the last part.
      // e.g., for "Project Alpha", we target a tooltip ending with that name.
      css += `div.TN[data-tooltip$="${label.name}"] .qr { background-color: ${label.color} !important; }`;
    });
  }
  
  styleElement.textContent = css;
}

/**
 * Handles features that require direct DOM manipulation, event listeners, or observers.
 * @param {object} settings - The user's settings object.
 */
function handleDynamicChanges(settings) {
  // --- Cleanup previous listeners/observers to avoid duplicates ---
  if (window.flowMail.conversationObserver) {
    window.flowMail.conversationObserver.disconnect();
    delete window.flowMail.conversationObserver;
  }
  
  // Remove elements created by the script
  ['flowmail-pause-overlay', 'flowmail-fabs', 'flowmail-saved-searches', 'flowmail-contextual-toolbar-style'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
  document.body.classList.remove('flowmail-contextual-toolbars');


  // --- Pause Inbox ---
  if (settings.inboxPaused) {
    const overlay = document.createElement('div');
    overlay.id = 'flowmail-pause-overlay';
    overlay.style = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.7); z-index: 9999;
      display: flex; justify-content: center; align-items: center;
      color: white; font-size: 2rem; font-weight: bold;
    `;
    overlay.textContent = 'Inbox Paused';
    document.body.appendChild(overlay);
  }

  // --- Floating Action Buttons ---
  const fabSettings = settings.floatingActions;
  if (fabSettings?.compose || fabSettings?.search || fabSettings?.tasks) {
    const fabContainer = document.createElement('div');
    fabContainer.id = 'flowmail-fabs';
    fabContainer.style = `
      position: fixed; bottom: 24px; right: 24px; z-index: 1000;
      display: flex; flex-direction: column; gap: 16px;
    `;
    
    const createFab = (icon, tooltip, onClick) => {
      const button = document.createElement('button');
      button.title = tooltip;
      button.setAttribute('aria-label', tooltip);
      button.style = `
        width: 56px; height: 56px; border-radius: 50%;
        background-color: #1a73e8; color: white;
        border: none; box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background-color 0.2s;
      `;
      button.onmouseover = () => button.style.backgroundColor = '#1b66c9';
      button.onmouseout = () => button.style.backgroundColor = '#1a73e8';
      button.innerHTML = icon;
      button.onclick = onClick;
      return button;
    };
    
    if (fabSettings.compose) {
      fabContainer.appendChild(createFab(
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
        'Compose',
        () => {
          // Find and click Gmail's native compose button
          const composeButton = document.querySelector('div[role="button"][gh="cm"]');
          if (composeButton) composeButton.click();
        }
      ));
    }
    document.body.appendChild(fabContainer);
  }

  // --- Saved Searches ---
  if (settings.savedSearches?.length > 0) {
    const searchesContainer = document.createElement('div');
    searchesContainer.id = 'flowmail-saved-searches';
    searchesContainer.style = `
      padding: 8px 16px;
      background-color: #f1f3f4;
      border-bottom: 1px solid #e0e0e0;
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
    `;
    searchesContainer.innerHTML = '<span style="font-weight: bold; font-size: 12px; margin-right: 8px;">Saved Searches:</span>';

    settings.savedSearches.forEach(search => {
      const link = document.createElement('a');
      link.textContent = search.query;
      link.href = `https://mail.google.com/mail/u/0/#search/${encodeURIComponent(search.query)}`;
      link.style = `
        background-color: #e8eaed;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 12px;
        text-decoration: none;
        color: #3c4043;
        transition: background-color 0.2s;
      `;
      link.onmouseover = () => link.style.backgroundColor = '#d2e3fc';
      link.onmouseout = () => link.style.backgroundColor = '#e8eaed';
      searchesContainer.appendChild(link);
    });

    const targetArea = document.querySelector('.bhZ.tch-Br');
    if (targetArea) {
      targetArea.prepend(searchesContainer);
    }
  }

  // --- Contextual Toolbars ---
  if (settings.contextualToolbars) {
    const style = document.createElement('style');
    style.id = 'flowmail-contextual-toolbar-style';
    style.textContent = `
      tr.zA:not(:hover) .brc, /* Action toolbar on right of row */
      tr.zA:not(:hover) .bAu { /* Action icons on left of row */
        opacity: 0 !important;
        transition: opacity 0.2s ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }

  // --- Conversation Order ---
  if (settings.conversationOrder === 'newest-first') {
    const observer = new MutationObserver(() => {
        // Find all conversation containers that haven't been processed
        const conversationLists = document.querySelectorAll('div[jscontroller="H5d53c"]:not([data-flowmail-reversed="true"])');
        
        conversationLists.forEach(list => {
            const messages = Array.from(list.children).filter(node => node.classList.contains('h7'));
            if (messages.length > 1) {
                messages.reverse().forEach(msg => list.appendChild(msg));
            }
            // Mark as processed to prevent re-reversing
            list.setAttribute('data-flowmail-reversed', 'true');
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.flowMail.conversationObserver = observer;
  }
}

/**
 * Main function to apply all settings.
 * @param {object} settings - The user's settings object.
 */
function applyAllSettings(settings) {
  if (!settings) return;
  console.log('Applying FlowMail settings:', settings);
  
  injectCss(settings);
  handleDynamicChanges(settings);
}

// --- INITIALIZATION ---

// Load initial settings from storage
if (chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get('settings', (data) => {
        if (data.settings) {
            applyAllSettings(data.settings);
        } else {
            console.log('FlowMail: No settings found in storage.');
        }
    });
}

// Listen for changes in settings and re-apply
if (chrome && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.settings) {
            applyAllSettings(changes.settings.newValue);
        }
    });
}
