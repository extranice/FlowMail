
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

  useEffect(() => {
    // This effect mimics how an extension would apply the theme
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // High contrast could be handled with a separate class or data attribute
    // For this demo, we just log it.
    if (settings.theme === 'high-contrast') {
      console.log("High contrast mode enabled");
    }
  }, [settings.theme]);
  
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
