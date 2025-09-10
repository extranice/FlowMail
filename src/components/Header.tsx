
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center h-16 px-4 sm:px-6 lg:px-8 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          <path d="M19 16.5v6" />
          <path d="M22 19.5h-6" />
        </svg>
        <h1 className="text-xl font-semibold text-text-light dark:text-text-dark">
          FlowMail
        </h1>
      </div>
    </header>
  );
};

export default Header;