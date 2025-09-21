import { useState, useEffect } from "react";
import "./Timer.css";
import CircularTimer from "../CircluarTimer/CircularTimer";
import SessionSettingsContainer from "../SessionSettingsContainer/SessionSettingsContainer";
import { Play, Pause, RotateCcw } from "lucide-react";
import type { CustomSettings } from "../../interfaces/CustomSettings";

const DEFAULT_TIMER_SETTINGS: CustomSettings = {
  id: "default",
  sessionName: "Default Session",
  workDuration: 25,
  breakDuration: 5,
  sessions: 4,
  autoStart: true,
  saveSession: false,
};

export default function Timer() {
  const [timerSettings, setTimerSettings] = useState<CustomSettings>(
    DEFAULT_TIMER_SETTINGS
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    DEFAULT_TIMER_SETTINGS.workDuration * 60
  );
  const [sessionType, setSessionType] = useState<"work" | "break">("work");

  const applySettingsToTimer = (settings: CustomSettings) => {
    setTimerSettings(settings);
    // Reset timer with new work duration
    const newDuration = settings.workDuration * 60;
    setRemainingTime(newDuration);
    setIsPlaying(false);
    setSessionType("work");
  };

  const getTotalDuration = () => {
    switch (sessionType) {
      case "work":
        return timerSettings.workDuration * 60;
      case "break":
        return timerSettings.breakDuration * 60;
      default:
        return timerSettings.workDuration * 60;
    }
  };

  const totalDuration = getTotalDuration();
  const progress = ((totalDuration - remainingTime) / totalDuration) * 100;

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Timer countdown effect
  useEffect(() => {
    let interval: number | null = null;

    if (isPlaying && remainingTime > 0) {
      interval = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            // Timer has finished, switch session type
            const nextSessionType = sessionType === "work" ? "break" : "work";
            setSessionType(nextSessionType);

            // Set new duration for next session
            const nextDuration =
              nextSessionType === "work"
                ? timerSettings.workDuration * 60
                : timerSettings.breakDuration * 60;

            // Auto-start logic: keep playing if auto-start is enabled, otherwise pause
            if (!timerSettings.autoStart) {
              setIsPlaying(false);
            }

            return nextDuration;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isPlaying,
    remainingTime,
    sessionType,
    timerSettings.breakDuration,
    timerSettings.workDuration,
    timerSettings.autoStart,
  ]);

  const toggleTimer = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    const newDuration =
      sessionType === "work"
        ? timerSettings.workDuration * 60
        : sessionType === "break"
        ? timerSettings.breakDuration * 60
        : timerSettings.workDuration * 60;
    setRemainingTime(newDuration);
  };

  return (
    <div className="timer-wrapper">
      <div className="timer-container">
        {/* Session Name Display */}
        <div className="session-name-display">
          {timerSettings.sessionName || "Default Session"}
        </div>

        <div className="timer-circle-overlay">
          <CircularTimer
            progress={progress}
            timeText={formatTime(remainingTime)}
            sessionType={sessionType}
            isRunning={isPlaying}
            remainingSeconds={remainingTime}
          />
        </div>
        <div className="control-buttons">
          <button onClick={toggleTimer} className="start-pause-button">
            {isPlaying ? (
              <>
                <Pause className="control-icon" />
                Pause
              </>
            ) : (
              <>
                <Play className="control-icon" />
                Start
              </>
            )}
          </button>

          <button onClick={resetTimer} className="reset-button">
            <RotateCcw className="control-icon" />
            Reset
          </button>
        </div>
      </div>
      <SessionSettingsContainer onApplySettings={applySettingsToTimer} />
    </div>
  );
}
