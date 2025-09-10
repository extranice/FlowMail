
import React from 'react';

interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-subtle border border-border-light dark:border-border-dark mb-8">
      <div className="p-5 sm:p-6 border-b border-border-light dark:border-border-dark">
        <h3 className="text-base font-semibold text-text-light dark:text-text-dark">{title}</h3>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">{description}</p>
      </div>
      <div className="p-5 sm:p-6 space-y-5">
        {children}
      </div>
    </div>
  );
};

export default SettingsCard;