
import React from 'react';
import { SettingsState, Theme } from '../../types';
import { FONT_FACES, FONT_WEIGHTS } from '../../constants';
import SettingsCard from '../SettingsCard';
import ToggleSwitch from '../ToggleSwitch';
import Slider from '../Slider';
import Dropdown from '../Dropdown';

interface LayoutSettingsProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
}

const LayoutSettings: React.FC<LayoutSettingsProps> = ({ settings, setSettings }) => {
  const handleToggle = <T extends keyof SettingsState['visualClutter']>(key: T, value: boolean) => {
    setSettings(prev => ({ ...prev, visualClutter: { ...prev.visualClutter, [key]: value } }));
  };

  const handleSizing = <T extends keyof SettingsState['sizing']>(key: T, value: number) => {
    setSettings(prev => ({ ...prev, sizing: { ...prev.sizing, [key]: value } }));
  };
  
  const handleFont = <T extends keyof SettingsState['font']>(key: T, value: string | number) => {
    setSettings(prev => ({ ...prev, font: { ...prev.font, [key]: value } }));
  };

  const handleTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">UI & Layout Customization</h2>

      <SettingsCard title="Visual Clutter" description="Clean up the Gmail interface by hiding unnecessary elements.">
        <ToggleSwitch id="ads" label="Hide Ads" checked={settings.visualClutter.ads} onChange={v => handleToggle('ads', v)} />
        <ToggleSwitch id="buttons" label="Hide Extra Buttons" checked={settings.visualClutter.extraButtons} onChange={v => handleToggle('extraButtons', v)} />
        <ToggleSwitch id="toolbars" label="Hide Unused Toolbars" checked={settings.visualClutter.unusedToolbars} onChange={v => handleToggle('unusedToolbars', v)} />
      </SettingsCard>

      <SettingsCard title="Sizing" description="Adjust the width of key interface areas for your screen size.">
        <Slider id="msg-width" label="Message Width" value={settings.sizing.messageWidth} min={50} max={100} unit="%" onChange={v => handleSizing('messageWidth', v)} />
        <Slider id="inbox-width" label="Inbox List Width" value={settings.sizing.inboxListWidth} min={20} max={50} unit="%" onChange={v => handleSizing('inboxListWidth', v)} />
      </SettingsCard>

      <SettingsCard title="Font Customization" description="Choose a font that's easy on your eyes.">
         <Dropdown
            label="Font Family"
            options={FONT_FACES.map(f => ({ label: f, value: f }))}
            selectedValue={settings.font.family}
            onSelect={v => handleFont('family', v)}
        />
        <Slider id="font-size" label="Font Size" value={settings.font.size} min={12} max={18} unit="px" onChange={v => handleFont('size', v)} />
        <Dropdown
            label="Font Weight"
            options={FONT_WEIGHTS}
            selectedValue={settings.font.weight}
            onSelect={v => handleFont('weight', v)}
        />
      </SettingsCard>

      <SettingsCard title="Custom Themes" description="Select a visual theme that suits your preference.">
        <div className="flex space-x-4">
          {(['light', 'dark', 'high-contrast'] as Theme[]).map(theme => (
             <button key={theme} onClick={() => handleTheme(theme)} className={`flex-1 p-4 rounded-lg border-2 transition-colors ${settings.theme === theme ? 'border-primary' : 'border-border-light dark:border-border-dark'}`}>
                <div className={`w-full h-16 rounded mb-2 ${theme === 'light' ? 'bg-gray-100' : theme === 'dark' ? 'bg-gray-800' : 'bg-black'}`}></div>
                <span className="capitalize font-medium">{theme}</span>
             </button>
          ))}
        </div>
      </SettingsCard>
    </div>
  );
};

export default LayoutSettings;