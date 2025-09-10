
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
      <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">Inbox & Workflow Tools</h2>

      <SettingsCard title="Pause Inbox" description="Temporarily stop new emails from appearing in your inbox.">
          <ToggleSwitch id="pause-inbox" label={settings.inboxPaused ? "Inbox is Paused" : "Pause Inbox"} checked={settings.inboxPaused} onChange={handlePauseInbox} />
      </SettingsCard>

      <SettingsCard title="Bundled Threads" description="Group emails by category, similar to Inbox by Google.">
          <ToggleSwitch id="bundle-enable" label="Enable Bundled Threads" checked={settings.bundledThreads.enabled} onChange={v => handleBundledThreads('enabled', v)} />
          {settings.bundledThreads.enabled && (
              <div className="pl-4 border-l-2 border-border-light dark:border-border-dark space-y-4 mt-4 pt-1">
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
                onKeyDown={(e) => e.key === 'Enter' && addSearch()}
                placeholder="e.g., from:jane has:attachment"
                className="flex-1 px-3 py-2 bg-card-light dark:bg-gray-700 border border-border-light dark:border-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button onClick={addSearch} className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-card-light dark:focus:ring-offset-card-dark transition-colors">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {settings.savedSearches.map(s => (
                <div key={s.id} className="flex items-center gap-2 p-1.5 pl-3 bg-primary-subtle-DEFAULT dark:bg-primary-subtle-dark rounded-full">
                    <code className="text-xs font-medium text-primary">{s.query}</code>
                    <button onClick={() => removeSearch(s.id)} className="w-5 h-5 rounded-full bg-primary/20 text-primary hover:bg-primary/30 flex items-center justify-center" aria-label={`Remove ${s.query}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            ))}
          </div>
      </SettingsCard>

      <SettingsCard title="Enhanced Label Management" description="Customize the appearance and behavior of your labels.">
        <ToggleSwitch id="compact-labels" label="Compact Label View" checked={settings.labels.compactView} onChange={v => setSettings(p => ({...p, labels: {...p.labels, compactView: v}}))} />
        <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold text-text-light dark:text-text-dark">Custom Label Colors</h4>
            {settings.labels.customColors.map(label => (
                <div key={label.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: label.color }} />
                        <span className="font-medium text-text-muted-light dark:text-text-muted-dark">{label.name}</span>
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