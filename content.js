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
    // A common selector for the right-hand side ad/info panel
    css += `div[role="complementary"] { display: none !important; }`;
  }
  if (settings.visualClutter?.extraButtons) {
     // Example selector for action buttons in the top bar
    css += `.G-atb { display: none !important; }`;
  }
  
  // --- Sizing ---
  // More complex sizing rules would go here, likely targeting main content areas
  // For example: .nH.bX.aiu might be the main view.
  css += `
    :root {
      --simplify-message-width: ${settings.sizing?.messageWidth || 80}%;
      --simplify-inbox-width: ${settings.sizing?.inboxListWidth || 30}%;
    }
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

  // Other non-CSS changes (like reversing conversation order) would require
  // more complex DOM manipulation using JavaScript.
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
