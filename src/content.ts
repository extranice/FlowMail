import type { SettingsState } from './types';

// FIX: Add type declaration for the 'chrome' extension API to resolve compile-time errors.
declare const chrome: any;

// Using a global object for state to avoid polluting the window object.
const flowMailState = {
  observer: null as MutationObserver | null,
};

/**
 * Applies settings to the Gmail DOM.
 * This function is designed to be idempotent.
 * @param {SettingsState} settings - The user's settings.
 */
function applyAllSettings(settings: SettingsState) {
  if (!settings) return;
  console.log('FlowMail: Applying settings...', settings);

  applyCssClassesAndVariables(settings);
  handleDynamicChanges(settings);
}

/**
 * Toggles classes and sets CSS variables on the root element.
 * @param {SettingsState} settings
 */
function applyCssClassesAndVariables(settings: SettingsState) {
  const root = document.documentElement;

  // Visual Clutter
  root.classList.toggle('flow-hide-ads', settings.visualClutter.ads);
  root.classList.toggle('flow-hide-extra-buttons', settings.visualClutter.extraButtons);
  root.classList.toggle('flow-hide-unused-toolbars', settings.visualClutter.unusedToolbars);
  
  // Sizing
  root.style.setProperty('--flow-message-width', `${settings.sizing.messageWidth}%`);
  root.style.setProperty('--flow-inbox-list-width', `${settings.sizing.inboxListWidth}%`);
  
  // Font
  const fontFamily = settings.font.family !== 'Default' ? `'${settings.font.family}', sans-serif` : 'inherit';
  root.style.setProperty('--flow-font-family', fontFamily);
  root.style.setProperty('--flow-font-size', `${settings.font.size}px`);
  root.style.setProperty('--flow-font-weight', `${settings.font.weight}`);
  
  // Minimalist Views
  root.classList.toggle('flow-minimal-conversation', settings.minimalistView.conversation);
  root.classList.toggle('flow-minimal-compose', settings.minimalistView.compose);
  root.classList.toggle('flow-minimal-reply', settings.minimalistView.reply);

  // Labels
  root.classList.toggle('flow-compact-labels', settings.labels.compactView);

  // Contextual Toolbars
  root.classList.toggle('flow-contextual-toolbars', settings.contextualToolbars);
}

/**
 * Handles complex DOM manipulations that CSS cannot manage alone.
 * @param {SettingsState} settings
 */
function handleDynamicChanges(settings: SettingsState) {
  // Disconnect previous observer if it exists
  if (flowMailState.observer) {
    flowMailState.observer.disconnect();
    flowMailState.observer = null;
  }

  // Conversation Order Reversal
  if (settings.conversationOrder === 'newest-first') {
    const observer = new MutationObserver(() => {
      const conversationLists = document.querySelectorAll('div[jscontroller="H5d53c"]:not([data-flowmail-reversed="true"])');
      conversationLists.forEach(list => {
        const messages = Array.from(list.children).filter(node => node.matches('.h7'));
        if (messages.length > 1) {
          messages.reverse().forEach(msg => list.appendChild(msg));
        }
        (list as HTMLElement).dataset.flowmailReversed = 'true';
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    flowMailState.observer = observer;
  }
}


// --- INITIALIZATION ---

// Load initial settings from storage
chrome.storage.sync.get('settings', (data) => {
  if (data.settings) {
    applyAllSettings(data.settings as SettingsState);
  } else {
    console.log('FlowMail: No settings found in storage.');
  }
});

// Listen for changes in settings and re-apply
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.settings) {
    applyAllSettings(changes.settings.newValue as SettingsState);
  }
});