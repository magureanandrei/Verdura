import { useState } from "react";
import { Settings, History, Plus } from "lucide-react";
import "./SessionSettingsContainer.css";
import type { SessionSettings } from "../../interfaces/SessionSettings";
import type { SessionSettingsDTO } from "../../interfaces/SessionSettingsDTO";
import type { PresetSettings } from "../../interfaces/PresetSettings";
import { defaultPresets } from "../../interfaces/DefaultPresets";
import axios from "axios";
import { toast } from "react-toastify";

interface SessionSettingsContainerProps {
  onApplySettings: (settings: SessionSettings) => void;
}

export default function SessionSettingsContainer({ onApplySettings }: SessionSettingsContainerProps) {
  const [activeTab, setActiveTab] = useState<"settings" | "presets">(
    "settings"
  );
  const [currentSettings, setCurrentSettings] = useState<SessionSettings>({
    sessionName: "",
    workDuration: 25,
    breakDuration: 5,
    sessions: 4,
    autoStart: true,
    saveSession: false
  });
  const [presets, setPresets] = useState<PresetSettings[]>(defaultPresets);

  const handleSettingChange = (
    key: keyof SessionSettings,
    value: number | boolean | string
  ) => {
    setCurrentSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyPreset = (preset: PresetSettings) => {
    setCurrentSettings(preset.settings);
  };

  const addCustomPreset = () => {
    const name = currentSettings.sessionName;
    if (name && name.trim()) {
      const newPreset: PresetSettings = {
        id: Date.now().toString(),
        name: name.trim(),
        settings: { ...currentSettings },
      };
      setPresets((prev) => [...prev, newPreset]);
    }
  };

  const handleSettingsAddToHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    onApplySettings(currentSettings);
    
    // If checkbox is checked, also save to presets
    if (currentSettings.saveSession) {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in local storage.');
          return;
        }
        
        try {
            const settingsDTO: SessionSettingsDTO = {
              sessionName: currentSettings.sessionName,
              workDuration: currentSettings.workDuration,
              breakDuration: currentSettings.breakDuration,
              sessions: currentSettings.sessions,
              autoStart: currentSettings.autoStart,
            };
            
            const response = await axios.post(`http://localhost:8080/settings/create/${userId}`, settingsDTO);
            if (response.status === 200) {                
                toast.success(`Settings saved successfully!`);
            }
        } catch (error) {
            console.error("Saving failed", error);
            toast.error("Saving settings failed. Please try again.");
        }
        
        console.log('Settings saved to backend:', currentSettings);
        
        // Also add to local presets for immediate UI feedback
        addCustomPreset();
        
        // Reset the checkbox
        handleSettingChange("saveSession", false);
      } catch (error) {
        console.error('Failed to save settings to backend:', error);
        
        // Still add to local presets as fallback
        addCustomPreset();
        handleSettingChange("saveSession", false);
      }
    }
  };

  

  return (
    <div className="settings-container">
      {/* Tab Navigation */}
      <div className="settings-tabs">
        <button
          className={`tab-button ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="tab-icon" />
          Session Settings
        </button>
        <button
          className={`tab-button ${activeTab === "presets" ? "active" : ""}`}
          onClick={() => setActiveTab("presets")}
        >
          <History className="tab-icon" />
          Preset Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="settings-content">
        {activeTab === "settings" ? (
          <div className="session-settings">
            <h3 className="settings-title">Timer Configuration</h3>

            {/* Session Name */}
          <form onSubmit={handleSettingsAddToHistory}>
            <div className="setting-group">
              <label className="setting-label">Session Name</label>
              <input
                type="text"
                placeholder="Enter session name"
                value={currentSettings.sessionName}
                onChange={(e) =>
                  handleSettingChange("sessionName", e.target.value)
                }
                className="setting-input"
              />
            </div>

            {/* Duration Settings */}
            <div className="duration-settings">
              <div className="setting-group">
                <label className="setting-label">
                  Work Duration: {currentSettings.workDuration} minutes
                </label>
                <input
                  type="range"
                  min="5"
                  max="90"
                  step="1"
                  value={currentSettings.workDuration}
                  onChange={(e) =>
                    handleSettingChange(
                      "workDuration",
                      parseInt(e.target.value)
                    )
                  }
                  className="setting-range"
                />
              </div>

              <div className="setting-group">
                <label className="setting-label">
                  Break Duration: {currentSettings.breakDuration} minutes
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={currentSettings.breakDuration}
                  onChange={(e) =>
                    handleSettingChange(
                      "breakDuration",
                      parseInt(e.target.value)
                    )
                  }
                  className="setting-range"
                />
              </div>

              <div className="setting-group">
                <label className="setting-label">
                  Sessions: {currentSettings.sessions}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={currentSettings.sessions}
                  onChange={(e) =>
                    handleSettingChange("sessions", parseInt(e.target.value))
                  }
                  className="setting-range"
                />
              </div>
            </div>

            {/* Autostart Settings */}
            <div className="autostart-settings">
              <div className="setting-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={currentSettings.autoStart}
                    onChange={(e) =>
                      handleSettingChange("autoStart", e.target.checked)
                    }
                    className="setting-checkbox"
                  />
                  <span className="checkbox-text">Auto-start sessions</span>
                </label>
              </div>

              <div className="setting-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={currentSettings.saveSession}
                    onChange={(e) => handleSettingChange("saveSession", e.target.checked)}
                    className="setting-checkbox"
                  />
                  <span className="checkbox-text">Save session to presets</span>
                </label>
              </div>
            </div>

            {/* Apply Settings Button */}
            <button className="add-history-button">
              <Plus className="button-icon" />
              Apply to Timer
            </button>
          </form>
          </div>
        ) : (
          <div className="preset-settings">
            <h3 className="settings-title">Preset Configurations</h3>

            <div className="presets-list">
              {presets.map((preset) => (
                <div key={preset.id} className="preset-item">
                  <div className="preset-info">
                    <h4 className="preset-name">{preset.name}</h4>
                    <div className="preset-details">
                      {preset.settings.workDuration}m /{" "}
                      {preset.settings.breakDuration}m /{" "}
                      {preset.settings.sessions} sessions
                    </div>
                  </div>
                  <button
                    className="apply-preset-button"
                    onClick={() => applyPreset(preset)}
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>

            <button className="add-preset-button" onClick={addCustomPreset}>
              <Plus className="button-icon" />
              Save Current as Preset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
