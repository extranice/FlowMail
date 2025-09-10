import { DEFAULT_SETTINGS } from './constants';

// FIX: Add type declaration for the 'chrome' extension API to resolve compile-time errors.
declare const chrome: any;

chrome.runtime.onInstalled.addListener((details) => {
  console.log('FlowMail service worker installed.');
  
  // On first install, save the default settings to sync storage.
  if (details.reason === 'install') {
    chrome.storage.sync.set({ settings: DEFAULT_SETTINGS }, () => {
      console.log('FlowMail: Default settings have been saved.');
    });
  }
});