
import React from 'react';
import { SettingsState } from '../../types';
import SettingsCard from '../SettingsCard';
import ToggleSwitch from '../ToggleSwitch';

interface ReadingSettingsProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
}

const ReadingSettings: React.FC<ReadingSettingsProps> = ({ settings, setSettings }) => {
    const handleOrderChange = (order: 'newest-first' | 'oldest-first') => {
        setSettings(prev => ({ ...prev, conversationOrder: order }));
    };

    const handleMinimalistToggle = <T extends keyof SettingsState['minimalistView']>(key: T, value: boolean) => {
        setSettings(prev => ({...prev, minimalistView: {...prev.minimalistView, [key]: value }}));
    };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Navigation & Reading Improvements</h2>

      <SettingsCard title="Conversation Order" description="Choose which message appears at the top of a conversation thread.">
        <div className="flex space-x-2 rounded-lg bg-background-light dark:bg-background-dark p-1">
            <button 
                onClick={() => handleOrderChange('newest-first')}
                className={`w-full py-2 rounded-md transition-colors ${settings.conversationOrder === 'newest-first' ? 'bg-primary text-white shadow' : 'hover:bg-primary/10'}`}
            >
                Newest on Top
            </button>
            <button 
                onClick={() => handleOrderChange('oldest-first')}
                className={`w-full py-2 rounded-md transition-colors ${settings.conversationOrder === 'oldest-first' ? 'bg-primary text-white shadow' : 'hover:bg-primary/10'}`}
            >
                Oldest on Top
            </button>
        </div>
      </SettingsCard>

      <SettingsCard title="Minimalist Views" description="Hide redundant headers, buttons, and borders for a cleaner reading experience.">
          <ToggleSwitch id="min-convo" label="Minimalist Conversation View" checked={settings.minimalistView.conversation} onChange={v => handleMinimalistToggle('conversation', v)} />
          <ToggleSwitch id="min-compose" label="Streamlined Compose Window" checked={settings.minimalistView.compose} onChange={v => handleMinimalistToggle('compose', v)} />
          <ToggleSwitch id="min-reply" label="Streamlined Reply Box" checked={settings.minimalistView.reply} onChange={v => handleMinimalistToggle('reply', v)} />
      </SettingsCard>

      <SettingsCard title="Quick-access Keyboard Shortcuts" description="Use these shortcuts to manage your inbox faster. (Customization not available in this demo).">
          <ul className="space-y-2 text-sm text-text-muted-light dark:text-text-muted-dark">
              <li className="flex justify-between"><span>Archive</span> <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">e</kbd></li>
              <li className="flex justify-between"><span>Snooze</span> <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">b</kbd></li>
              <li className="flex justify-between"><span>Apply Label</span> <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">l</kbd></li>
              <li className="flex justify-between"><span>Mark as Read</span> <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Shift + i</kbd></li>
              <li className="flex justify-between"><span>Mark as Unread</span> <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Shift + u</kbd></li>
          </ul>
      </SettingsCard>
    </div>
  );
};

export default ReadingSettings;
