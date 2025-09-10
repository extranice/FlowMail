// FIX: Add type declarations for the chrome extension API to resolve "Cannot find name 'chrome'" errors.
declare namespace chrome {
  namespace storage {
    interface StorageArea {
      get(
        keys: string | string[] | { [key: string]: any } | null,
        callback: (items: { [key: string]: any }) => void
      ): void;
      set(items: { [key: string]: any }, callback?: () => void): void;
    }
    const local: StorageArea;
  }
}

import React, { useState, useEffect } from 'react';
import { SettingsState, Page } from './types';
import { DEFAULT_SETTINGS, NAV_ITEMS } from './constants';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LayoutSettings from './components/pages/LayoutSettings';
import WorkflowSettings from './components/pages/WorkflowSettings';
import ReadingSettings from './components/pages/ReadingSettings';
import EnhancementsSettings from './components/pages/EnhancementsSettings';

const App: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [activePage, setActivePage] = useState<Page>('layout');

  // Load settings from browser storage on initial render
  useEffect(() => {
    // Check if the chrome API is available (i.e., we are in an extension)
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get('settings', (data) => {
        if (data.settings) {
          // Deep merge stored settings with defaults to handle extension updates
          const stored = data.settings;
          setSettings(prev => ({
            ...prev,
            ...stored,
            visualClutter: { ...prev.visualClutter, ...stored.visualClutter },
            sizing: { ...prev.sizing, ...stored.sizing },
            font: { ...prev.font, ...stored.font },
            collapsible: { ...prev.collapsible, ...stored.collapsible },
            bundledThreads: {
              ...prev.bundledThreads,
              ...stored.bundledThreads,
              categories: { ...prev.bundledThreads.categories, ...stored.bundledThreads?.categories },
            },
            labels: { ...prev.labels, ...stored.labels },
            minimalistView: { ...prev.minimalistView, ...stored.minimalistView },
            floatingActions: { ...prev.floatingActions, ...stored.floatingActions },
            notifications: { ...prev.notifications, ...stored.notifications },
          }));
        }
      });
    }
  }, []);

  // Save settings to storage whenever they change, and apply theme to the settings page
  useEffect(() => {
    // Save to extension storage
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ settings });
    }

    // Apply theme to the settings page itself
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // High contrast could be handled with a separate class or data attribute
    if (settings.theme === 'high-contrast') {
      console.log("High contrast mode enabled");
    }
  }, [settings]);
  
  const renderActivePage = () => {
    const props = { settings, setSettings };
    switch (activePage) {
      case 'layout':
        return <LayoutSettings {...props} />;
      case 'workflow':
        return <WorkflowSettings {...props} />;
      case 'reading':
        return <ReadingSettings {...props} />;
      case 'enhancements':
        return <EnhancementsSettings {...props} />;
      default:
        return <LayoutSettings {...props} />;
    }
  };

  return (
    <div className="min-h-screen text-text-light dark:text-text-dark font-sans">
      <Header />
      <div className="flex">
        <Sidebar 
          navItems={NAV_ITEMS}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
};

export default App;
