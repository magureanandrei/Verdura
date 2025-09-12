import { useState } from "react";
import { Settings, History, Plus } from "lucide-react";
import "./SessionSettingsContainer.css";

interface SessionSettings {
  sessionName: string;
  workDuration: number;
  breakDuration: number;
  sessions: number;
  autoStartBreaks: boolean;
  autoStartWorkPeriods: boolean;
}

interface PresetSettings {
  id: string;
  name: string;
  settings: SessionSettings;
}

const defaultPresets: PresetSettings[] = [
  {
    id: "classic",
    name: "Classic Pomodoro",
    settings: {
      sessionName: "",
      workDuration: 25,
      breakDuration: 5,
      sessions: 4,
      autoStartBreaks: false,
      autoStartWorkPeriods: false,
    },
  },
  {
    id: "short-burst",
    name: "Short Burst",
    settings: {
      sessionName: "",
      workDuration: 15,
      breakDuration: 3,
      sessions: 3,
      autoStartBreaks: true,
      autoStartWorkPeriods: false,
    },
  },
  {
    id: "extended",
    name: "Extended Focus",
    settings: {
      sessionName: "",
      workDuration: 45,
      breakDuration: 10,
      sessions: 2,
      autoStartBreaks: false,
      autoStartWorkPeriods: false,
    },
  },
];

export default function SessionSettingsContainer() {
  const [activeTab, setActiveTab] = useState<"settings" | "presets">(
    "settings"
  );
  const [currentSettings, setCurrentSettings] = useState<SessionSettings>({
    sessionName: "",
    workDuration: 25,
    breakDuration: 5,
    sessions: 4,
    autoStartBreaks: false,
    autoStartWorkPeriods: false,
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

  const addToHistory = () => {
    // TODO: Implement add to history functionality
    console.log("Adding current settings to history:", currentSettings);
  };

  const applyPreset = (preset: PresetSettings) => {
    setCurrentSettings(preset.settings);
  };

  const addCustomPreset = () => {
    const name = prompt("Enter preset name:");
    if (name && name.trim()) {
      const newPreset: PresetSettings = {
        id: Date.now().toString(),
        name: name.trim(),
        settings: { ...currentSettings },
      };
      setPresets((prev) => [...prev, newPreset]);
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
                  step="5"
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
                  min="2"
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
                    checked={currentSettings.autoStartBreaks}
                    onChange={(e) =>
                      handleSettingChange("autoStartBreaks", e.target.checked)
                    }
                    className="setting-checkbox"
                  />
                  <span className="checkbox-text">Auto-start breaks</span>
                </label>
              </div>

              <div className="setting-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={currentSettings.autoStartWorkPeriods}
                    onChange={(e) =>
                      handleSettingChange(
                        "autoStartWorkPeriods",
                        e.target.checked
                      )
                    }
                    className="setting-checkbox"
                  />
                  <span className="checkbox-text">Auto-start work periods</span>
                </label>
              </div>
            </div>

            {/* Add to History Button */}
            <button className="add-history-button" onClick={addToHistory}>
              <Plus className="button-icon" />
              Add to Presets
            </button>
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
