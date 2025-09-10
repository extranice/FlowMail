
import React, { useState } from 'react';
import { SettingsState, SavedSearch, CustomLabel } from '../../types';
import SettingsCard from '../SettingsCard';
import ToggleSwitch from '../ToggleSwitch';
import ColorPicker from '../ColorPicker';

interface WorkflowSettingsProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
}

const WorkflowSettings: React.FC<WorkflowSettingsProps> = ({ settings, setSettings }) => {
    const [newSearch, setNewSearch] = useState('');

    const handlePauseInbox = (paused: boolean) => {
        setSettings(prev => ({...prev, inboxPaused: paused}));
    };

    const handleBundledThreads = <T extends keyof SettingsState['bundledThreads'] | keyof SettingsState['bundledThreads']['categories']>(key: T, value: boolean) => {
        if (key === 'enabled') {
            setSettings(prev => ({ ...prev, bundledThreads: { ...prev.bundledThreads, enabled: value } }));
        } else {
            setSettings(prev => ({
                ...prev,
                bundledThreads: {
                    ...prev.bundledThreads,
                    categories: { ...prev.bundledThreads.categories, [key]: value }
                }
            }));
        }
    };
    
    const addSearch = () => {
        if (newSearch.trim() === '') return;
        const search: SavedSearch = { id: Date.now().toString(), query: newSearch.trim() };
        setSettings(prev => ({...prev, savedSearches: [...prev.savedSearches, search]}));
        setNewSearch('');
    };

    const removeSearch = (id: string) => {
        setSettings(prev => ({...prev, savedSearches: prev.savedSearches.filter(s => s.id !== id)}));
    };

    const handleLabelColorChange = (id: string, color: string) => {
        setSettings(prev => ({
            ...prev,
            labels: {
                ...prev.labels,
                customColors: prev.labels.customColors.map(label => 
                    label.id === id ? { ...label, color } : label
                )
            }
        }));
    };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Inbox & Workflow Tools</h2>

      <SettingsCard title="Pause Inbox" description="Temporarily stop new emails from appearing in your inbox.">
          <ToggleSwitch id="pause-inbox" label={settings.inboxPaused ? "Inbox is Paused" : "Pause Inbox"} checked={settings.inboxPaused} onChange={handlePauseInbox} />
      </SettingsCard>

      <SettingsCard title="Bundled Threads" description="Group emails by category, similar to Inbox by Google.">
          <ToggleSwitch id="bundle-enable" label="Enable Bundled Threads" checked={settings.bundledThreads.enabled} onChange={v => handleBundledThreads('enabled', v)} />
          {settings.bundledThreads.enabled && (
              <div className="pl-4 border-l-2 border-border-light dark:border-border-dark space-y-4 mt-4">
                  <ToggleSwitch id="bundle-updates" label="Bundle 'Updates'" checked={settings.bundledThreads.categories.updates} onChange={v => handleBundledThreads('updates', v)} />
                  <ToggleSwitch id="bundle-social" label="Bundle 'Social'" checked={settings.bundledThreads.categories.social} onChange={v => handleBundledThreads('social', v)} />
                  <ToggleSwitch id="bundle-finance" label="Bundle 'Finance'" checked={settings.bundledThreads.categories.finance} onChange={v => handleBundledThreads('finance', v)} />
              </div>
          )}
      </SettingsCard>

      <SettingsCard title="Saved Searches" description="Pin your frequent Gmail searches as one-click shortcuts.">
          <div className="flex gap-2">
              <input 
                type="text"
                value={newSearch}
                onChange={(e) => setNewSearch(e.target.value)}
                placeholder="e.g., from:jane has:attachment"
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-border-light dark:border-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button onClick={addSearch} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Add</button>
          </div>
          <ul className="space-y-2 mt-4">
            {settings.savedSearches.map(s => (
                <li key={s.id} className="flex justify-between items-center p-2 bg-background-light dark:bg-background-dark rounded">
                    <code className="text-sm">{s.query}</code>
                    <button onClick={() => removeSearch(s.id)} className="text-red-500 hover:text-red-700">Remove</button>
                </li>
            ))}
          </ul>
      </SettingsCard>

      <SettingsCard title="Enhanced Label Management" description="Customize the appearance and behavior of your labels.">
        <ToggleSwitch id="compact-labels" label="Compact Label View" checked={settings.labels.compactView} onChange={v => setSettings(p => ({...p, labels: {...p.labels, compactView: v}}))} />
        <div className="space-y-3">
            <h4 className="font-medium">Custom Label Colors</h4>
            {settings.labels.customColors.map(label => (
                <div key={label.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: label.color }} />
                        <span>{label.name}</span>
                    </div>
                    <ColorPicker color={label.color} onChange={c => handleLabelColorChange(label.id, c)} />
                </div>
            ))}
        </div>
      </SettingsCard>
    </div>
  );
};

export default WorkflowSettings;