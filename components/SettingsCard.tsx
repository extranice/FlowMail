
import React from 'react';

interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark mb-8">
      <div className="p-6 border-b border-border-light dark:border-border-dark">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">{description}</p>
      </div>
      <div className="p-6 space-y-6">
        {children}
      </div>
    </div>
  );
};

export default SettingsCard;
