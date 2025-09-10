
import React from 'react';
import { SettingsState } from '../../types';
import SettingsCard from '../SettingsCard';
import ToggleSwitch from '../ToggleSwitch';

interface EnhancementsSettingsProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
}

const EnhancementsSettings: React.FC<EnhancementsSettingsProps> = ({ settings, setSettings }) => {
    const handleFabToggle = <T extends keyof SettingsState['floatingActions']>(key: T, value: boolean) => {
        setSettings(prev => ({...prev, floatingActions: {...prev.floatingActions, [key]: value }}));
    };

    const handleNotificationToggle = <T extends keyof SettingsState['notifications']>(key: T, value: boolean) => {
        setSettings(prev => ({...prev, notifications: {...prev.notifications, [key]: value }}));
    };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Extra Enhancements</h2>

      <SettingsCard title="Floating Action Buttons (FABs)" description="Enable quick-access floating buttons for common actions.">
        <ToggleSwitch id="fab-compose" label="Enable 'Compose' FAB" checked={settings.floatingActions.compose} onChange={v => handleFabToggle('compose', v)} />
        <ToggleSwitch id="fab-search" label="Enable 'Search' FAB" checked={settings.floatingActions.search} onChange={v => handleFabToggle('search', v)} />
        <ToggleSwitch id="fab-tasks" label="Enable 'Tasks' FAB" checked={settings.floatingActions.tasks} onChange={v => handleFabToggle('tasks', v)} />
      </SettingsCard>
      
      <SettingsCard title="Account & Notifications" description="Improve multi-account switching and customize desktop notifications.">
        <ToggleSwitch id="multi-account" label="Streamlined Multi-Account UI" checked={settings.multiAccount} onChange={v => setSettings(p => ({ ...p, multiAccount: v }))} />
        <ToggleSwitch id="notifications" label="Enable Custom Desktop Popups" checked={settings.notifications.enabled} onChange={v => handleNotificationToggle('enabled', v)} />
        {settings.notifications.enabled && (
             <div className="pl-4 border-l-2 border-border-light dark:border-border-dark mt-4">
                <ToggleSwitch id="notif-actions" label="Include Quick Actions (Reply, Archive)" checked={settings.notifications.withActions} onChange={v => handleNotificationToggle('withActions', v)} />
            </div>
        )}
      </SettingsCard>

      <SettingsCard title="Contextual Toolbars" description="Show toolbars only when hovering over or selecting messages.">
          <ToggleSwitch id="context-toolbars" label="Enable Contextual Toolbars" checked={settings.contextualToolbars} onChange={v => setSettings(p => ({...p, contextualToolbars: v}))} />
      </SettingsCard>
    </div>
  );
};

export default EnhancementsSettings;
