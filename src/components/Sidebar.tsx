import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  navItems: { id: Page; label: string; icon: React.ReactElement }[];
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, activePage, setActivePage }) => {
  return (
    <aside className="w-64 p-4 border-r border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark hidden md:block">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors duration-200 ${
              activePage === item.id
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-primary/5 text-text-muted-light dark:text-text-muted-dark'
            }`}
          >
            <span className="w-6 h-6">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;