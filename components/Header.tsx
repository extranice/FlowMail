
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center h-16 px-4 sm:px-6 lg:px-8 bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark">
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          <line x1="12" y1="22" x2="12" y2="15" />
        </svg>
        <h1 className="text-xl font-semibold text-text-light dark:text-text-dark">
          Simplify Gmail
        </h1>
      </div>
    </header>
  );
};

export default Header;
