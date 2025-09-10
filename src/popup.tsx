import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// FIX: Add type declaration for the 'chrome' extension API to resolve compile-time errors.
declare const chrome: any;

const Popup: React.FC = () => {
  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };
  
  const manifest = chrome.runtime.getManifest();

  return (
    <div className="w-64 p-4 font-sans bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      <div className="flex items-center gap-3 mb-4">
        <img src="/icons/icon48.png" alt="FlowMail Logo" className="w-8 h-8" />
        <div>
          <h1 className="text-lg font-bold">FlowMail</h1>
          <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Version {manifest.version}</p>
        </div>
      </div>
      <button 
        onClick={openOptionsPage}
        className="w-full px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-card-light dark:focus:ring-offset-card-dark"
      >
        Open Settings
      </button>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);