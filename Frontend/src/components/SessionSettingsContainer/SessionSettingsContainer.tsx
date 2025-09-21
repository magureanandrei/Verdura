import { useState, useEffect } from "react";
import { Settings, History, Plus } from "lucide-react";
import "./SessionSettingsContainer.css";
import type { CustomSettings } from "../../interfaces/CustomSettings";
import type { SessionSettingsDTO } from "../../interfaces/SessionSettingsDTO";
import type { SavedSessionSettings } from "../../interfaces/SavedSessionsSettings";
import { defaultPresets } from "../../interfaces/DefaultPresets";
import axios from "axios";
import { toast } from "react-toastify";

interface SessionSettingsContainerProps {
  onApplySettings: (settings: CustomSettings) => void;
}

export default function SessionSettingsContainer({
  onApplySettings,
}: SessionSettingsContainerProps) {
  const [activeTab, setActiveTab] = useState<"custom" | "savedSessions">(
    "custom"
  );
  const [currentCustom, setCurrentCustom] = useState<CustomSettings>({
    sessionName: "",
    workDuration: 25,
    breakDuration: 5,
    sessions: 4,
    autoStart: true,
    saveSession: false,
  });
  const [savedSessions, setSavedSessions] =
    useState<SavedSessionSettings[]>(defaultPresets);

  useEffect(() => {
    fetchSavedSettings();
  }, []);

  const handleCustomSettingChange = (
    key: keyof CustomSettings,
    value: number | boolean | string
  ) => {
    setCurrentCustom((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applySavedSession = (savedSession: SavedSessionSettings) => {
    setCurrentCustom(savedSession.settings);
  };

  // const addCustomSavedSession = () => {
  //   const name = currentCustom.sessionName;
  //   if (name && name.trim()) {
  //     const newSavedSession: SavedSessionSettings = {
  //       id: Date.now().toString(),
  //       name: name.trim(),
  //       settings: { ...currentCustom },
  //     };
  //     setSavedSessions((prev) => [...prev, newSavedSession]);
  //   }
  // };

  const handleSaveSession = async (e: React.FormEvent) => {
    e.preventDefault();

    onApplySettings(currentCustom);

    // If checkbox is checked, also save to saved sessions
    if (currentCustom.saveSession) {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in local storage.");
          return;
        }

        try {
          const settingsDTO: SessionSettingsDTO = {
            sessionName: currentCustom.sessionName,
            workDuration: currentCustom.workDuration,
            breakDuration: currentCustom.breakDuration,
            sessions: currentCustom.sessions,
            autoStart: currentCustom.autoStart,
          };

          const response = await axios.post(
            `http://localhost:8080/settings/create/${userId}`,
            settingsDTO
          );
          if (response.status === 200) {
            toast.success(`Settings saved successfully!`);
          }
        } catch (error) {
          console.error("Saving failed", error);
          toast.error("Saving settings failed. Please try again.");
        }

        console.log("Settings saved to backend:", currentCustom);

        // Also add to local saved sessions for immediate UI feedback
        addCustomSavedSession();

        // Reset the checkbox
        handleCustomSettingChange("saveSession", false);
      } catch (error) {
        console.error("Failed to save settings to backend:", error);

        // Still add to local saved sessions as fallback
        addCustomSavedSession();
        handleCustomSettingChange("saveSession", false);
      }
    }
  };

  const fetchSavedSettings = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in local storage.");
      return;
    }
    try {
      const response = await axios.get<SessionSettingsDTO[]>(
        `http://localhost:8080/settings/user/${userId}`
      );
      if (response.status === 200) {
        console.log("Raw backend response:", response.data); // Debug log

        const customSettingsFromBackend = response.data.map((dto) => {
          console.log("Processing DTO:", dto); // Debug each DTO
          return {
            sessionName: dto.sessionName,
            workDuration: dto.workDuration,
            breakDuration: dto.breakDuration,
            sessions: dto.sessions,
            autoStart: dto.autoStart,
            saveSession: false,
          };
        });

        console.log("Mapped settings:", customSettingsFromBackend); // Debug mapped data

        const backendSavedSessions = customSettingsFromBackend.map((settings, index) => ({
          id: `backend-${index}`,
          name: settings.sessionName || `Saved Session ${index + 1}`,
          settings,
        }));

        console.log("Final saved sessions:", backendSavedSessions); // Debug final saved sessions

        setSavedSessions((prev) => [...prev, ...backendSavedSessions]);
      }
    } catch (error) {
      console.error("Failed to fetch settings from backend:", error);
      toast.error("Fetching settings failed. Please try again.");
    }
  };

  return (
    <div className="settings-container">
      {/* Tab Navigation */}
      <div className="settings-tabs">
        <button
          className={`tab-button ${activeTab === "savedSessions" ? "active" : ""}`}
          onClick={() => setActiveTab("savedSessions")}
        >
          <Settings className="tab-icon" />
          Custom Session
        </button>
        <button
          className={`tab-button ${activeTab === "savedSessions" ? "active" : ""}`}
          onClick={() => setActiveTab("savedSessions")}
        >
          <History className="tab-icon" />
          Saved Sessions
        </button>
      </div>

      {/* Tab Content */}
      <div className="settings-content">
        {activeTab === "custom" ? (
          <div className="session-settings">
            <h3 className="settings-title">Timer Configuration</h3>

            {/* Session Name */}
            <form onSubmit={handleSaveSession}>
              <div className="setting-group">
                <label className="setting-label">Session Name</label>
                <input
                  type="text"
                  placeholder="Enter session name"
                  value={currentCustom.sessionName}
                  onChange={(e) =>
                    handleCustomSettingChange("sessionName", e.target.value)
                  }
                  className="setting-input"
                />
              </div>

              {/* Duration Settings */}
              <div className="duration-settings">
                <div className="setting-group">
                  <label className="setting-label">
                    Work Duration: {currentCustom.workDuration} minutes
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="90"
                    step="1"
                    value={currentCustom.workDuration}
                    onChange={(e) =>
                      handleCustomSettingChange(
                        "workDuration",
                        parseInt(e.target.value)
                      )
                    }
                    className="setting-range"
                  />
                </div>

                <div className="setting-group">
                  <label className="setting-label">
                    Break Duration: {currentCustom.breakDuration} minutes
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={currentCustom.breakDuration}
                    onChange={(e) =>
                      handleCustomSettingChange(
                        "breakDuration",
                        parseInt(e.target.value)
                      )
                    }
                    className="setting-range"
                  />
                </div>

                <div className="setting-group">
                  <label className="setting-label">
                    Sessions: {currentCustom.sessions}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={currentCustom.sessions}
                    onChange={(e) =>
                      handleCustomSettingChange("sessions", parseInt(e.target.value))
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
                      checked={currentCustom.autoStart}
                      onChange={(e) =>
                        handleCustomSettingChange("autoStart", e.target.checked)
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
                      checked={currentCustom.saveSession}
                      onChange={(e) =>
                        handleCustomSettingChange("saveSession", e.target.checked)
                      }
                      className="setting-checkbox"
                    />
                    <span className="checkbox-text">Save this Session</span>
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
          <div className="saved-sessions-settings">
            <h3 className="settings-title">Saved Session Configurations</h3>

            <div className="saved-sessions-list">
              {savedSessions.map((savedSession) => (
                <div key={savedSession.id} className="saved-session-item">
                  <div className="saved-session-info">
                    <h4 className="saved-session-name">{savedSession.name}</h4>
                    <div className="saved-session-details">
                      {savedSession.settings.workDuration}m /{" "}
                      {savedSession.settings.breakDuration}m /{" "}
                      {savedSession.settings.sessions} sessions
                    </div>
                  </div>
                  <button
                    className="apply-saved-session-button"
                    onClick={() => applySavedSession(savedSession)}
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>

            <button className="add-saved-session-button" onClick={addCustomSavedSession}>
              <Plus className="button-icon" />
              Save Current Timer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
