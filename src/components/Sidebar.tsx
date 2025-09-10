import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  navItems: { id: Page; label: string; icon: React.ReactElement }[];
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, activePage, setActivePage }) => {
  return (
    <aside className="w-64 p-4 border-r border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark hidden md:block">
      <nav className="space-y-1.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors duration-200 text-sm font-medium ${
              activePage === item.id
                ? 'bg-primary-subtle-DEFAULT dark:bg-primary-subtle-dark text-primary font-semibold'
                : 'hover:bg-gray-500/5 text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;