import { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../hooks/useTheme";
import "../styles/setting.css";

const Settings = () => {
  const { theme, updateTheme } = useTheme();
  const [settings, setSettings] = useState({
    theme: theme,
    fontSize: localStorage.getItem('fontSize') || 'medium',
    notifications: JSON.parse(localStorage.getItem('notifications') || 'true'),
    autoSave: JSON.parse(localStorage.getItem('autoSave') || 'true'),
    compactView: JSON.parse(localStorage.getItem('compactView') || 'false')
  });

  const themes = {
    light: {
      primary: 'orange-500',
      background: 'gray-50',
      text: 'gray-900'
    },
    dark: {
      primary: 'orange-400',
      background: 'gray-800',
      text: 'gray-100'
    },
    blue: {
      primary: 'blue-500',
      background: 'blue-50',
      text: 'gray-900'
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(key, typeof value === 'boolean' ? JSON.stringify(value) : value);
    
    if (key === 'theme') {
      updateTheme(value);
      toast.success('Theme updated successfully');
    } else {
      toast.success('Setting updated successfully');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-emerald-600 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gradient-animate mb-6">Settings</h2>
        
        {/* Theme Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-emerald-100 mb-4">Appearance</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(themes).map((themeName) => (
              <button
                key={themeName}
                onClick={() => handleSettingChange('theme', themeName)}
                className={`p-4 rounded-lg border-2 transition-all text-white ${
                  settings.theme === themeName
                    ? 'border-emerald-300 bg-emerald-400'
                    : 'border-emerald-300 hover:border-emerald-300'
                }`}
              >
                <div className={`text-${themes[themeName].primary} mb-2`}>
                  <i className="fas fa-palette text-white text-xl"></i>
                </div>
                <div className="font-medium capitalize">{themeName}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-emerald-100 mb-4">Text Size</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleSettingChange('fontSize', 'small')}
              className={`px-4 py-2 rounded ${
                settings.fontSize === 'small'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Small
            </button>
            <button
              onClick={() => handleSettingChange('fontSize', 'medium')}
              className={`px-4 py-2 rounded ${
                settings.fontSize === 'medium'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => handleSettingChange('fontSize', 'large')}
              className={`px-4 py-2 rounded ${
                settings.fontSize === 'large'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Large
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-emerald-100 mb-4">Preferences</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-emerald-100">Enable Notifications</span>
              <div
                onClick={() => handleSettingChange('notifications', !settings.notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-emerald-100">Auto-save Documents</span>
              <div
                onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoSave ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-emerald-100">Compact View</span>
              <div
                onClick={() => handleSettingChange('compactView', !settings.compactView)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.compactView ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.compactView ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
