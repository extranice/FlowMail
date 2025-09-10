// content.js

function applySettings(settings) {
  if (!settings) return;
  
  console.log('Applying Simplify Gmail settings:', settings);
  
  const styleId = 'simplify-gmail-styles';
  let styleElement = document.getElementById(styleId);
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  // This is where the magic happens. We generate CSS rules based on settings.
  let css = '';

  // --- Visual Clutter ---
  if (settings.visualClutter?.ads) {
    // Use attribute selectors for more stability than class names
    css += `div[role="complementary"] { display: none !important; }`;
  }
  if (settings.visualClutter?.extraButtons) {
    // Example: Hiding the top action buttons in a message view
    css += `div[role="toolbar"][aria-label="Message actions"] { opacity: 0.5; }`; // Example only
  }
  
  // --- Sizing ---
  // Example: You might target the main conversation pane and the list pane
  // Note: These selectors are examples and will need to be verified.
  css += `
    :root {
      --simplify-message-width: ${settings.sizing?.messageWidth || 80}%;
      --simplify-inbox-width: ${settings.sizing?.inboxListWidth || 30}%;
    }
    /* You would need to find the right elements to apply these variables to */
  `;

  // --- Font Customization ---
  if (settings.font?.family && settings.font.family !== 'Default') {
     css += `
      body, .zA { 
        font-family: '${settings.font.family}', sans-serif !important; 
      }
    `;
  }
  css += `
    body, .zA {
      font-size: ${settings.font?.size || 14}px !important;
      font-weight: ${settings.font?.weight || 400} !important;
    }
  `;
  
  // Apply all generated CSS
  styleElement.textContent = css;

  // --- JAVASCRIPT-BASED CHANGES ---
  // The features below require direct DOM manipulation, not just CSS.
  // This is where the bulk of the implementation work is.
  
  // --- Conversation Order ---
  if (settings.conversationOrder === 'newest-first') {
    // Logic to reverse conversation order
    // 1. Find the container for all messages in a thread (e.g., using a selector like `div[role="list"]`).
    // 2. Get all the direct children (the individual message elements).
    // 3. Reverse the array of children.
    // 4. Append them back to the container in the new order.
    // 5. This should be run whenever a conversation is opened. A MutationObserver might be needed to detect this.
  }

  // --- Pause Inbox ---
  if (settings.inboxPaused) {
    // This is complex. A simple approach is to hide the inbox list:
    // `styleElement.textContent += 'div[role="tabpanel"] { display: none; }';`
    // A more advanced approach would involve intercepting network requests to prevent new mail data from loading.
  }

  // --- Contextual Toolbars ---
  if (settings.contextualToolbars) {
    // 1. Use CSS to hide the toolbars by default (e.g., `opacity: 0`).
    // 2. Add mouseover/mouseout event listeners to each message row (`div[role="row"]`).
    // 3. On mouseover, find the toolbar within that row and make it visible (`opacity: 1`).
    // 4. On mouseout, hide it again.
  }
}

// Load initial settings from storage
if (chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get('settings', (data) => {
        if (data.settings) {
            applySettings(data.settings);
        } else {
            console.log('Simplify Gmail: No settings found in storage.');
        }
    });
}

// Listen for changes in settings and re-apply
if (chrome && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.settings) {
            applySettings(changes.settings.newValue);
        }
    });
}
