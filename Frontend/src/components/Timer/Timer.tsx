import { useState, useEffect } from "react";
import "./Timer.css";
import CircularTimer from "../CircluarTimer/CircularTimer";
import SessionSettingsContainer from "../SessionSettingsContainer/SessionSettingsContainer";
import { Play, Pause, RotateCcw } from "lucide-react";
import type { CustomSettings } from "../../interfaces/CustomSettings";
import { motion } from "framer-motion";


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
  const [focusMode, setFocusMode] = useState(false);

  const applySettingsToTimer = (settings: CustomSettings) => {
    setTimerSettings(settings);
    // Reset timer with new work duration
    const newDuration = settings.workDuration * 60;
    setRemainingTime(newDuration);
    setIsPlaying(false);
    setSessionType("work");
    setFocusMode(false);
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
              setFocusMode(false); // Exit focus mode when timer stops
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
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    setFocusMode(newPlayingState); // Focus mode matches playing state
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setFocusMode(false);
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
      {/* Animated timer container */}
      <motion.div
        className="timer-container"
        animate={{
          scale: focusMode ? 1.05 : 1,
          y: focusMode ? -20 : 0,
         x: focusMode ? "clamp(275px, 10vw, 80px)" : 0,

        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          transform: focusMode ? undefined : undefined
        }}
      >
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
      </motion.div>
      
      <div>
        <SessionSettingsContainer 
        onApplySettings={applySettingsToTimer}
        focusMode={focusMode}
         />
      </div>
    </div>
  );
}
