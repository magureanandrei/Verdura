import { useState, useEffect } from "react";
import "./Timer.css";
import CircularTimer from "../CircluarTimer/CircularTimer";
import SessionSettingsContainer from "../SessionSettingsContainer/SessionSettingsContainer";
import { Play, Pause, RotateCcw } from "lucide-react";
import type { CustomSettings } from "../../interfaces/CustomSettings";
import { motion } from "framer-motion";
import clockTickingSound from "../../sounds/real-clock-ticking-379469.mp3";
import finishSound from "../../sounds/short-nuisance-alarm-153267.mp3";
import inBetweenSound from "../../sounds/simple-notification-152054.mp3";

const DEFAULT_TIMER_SETTINGS: CustomSettings = {
  id: "default",
  sessionName: "Default Session",
  workDuration: 0.2, // for testing
  breakDuration: 0.2, // for testing
  sessions: 2,
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [currentSession, setCurrentSession] = useState(1);

  const applySettingsToTimer = (settings: CustomSettings) => {
    setTimerSettings(settings);
    // Reset timer with new work duration
    const newDuration = settings.workDuration * 60;
    setRemainingTime(newDuration);
    setIsPlaying(false);
    setSessionType("work");
    setFocusMode(false);
    setCurrentSession(1);
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
          // Play ticking sound when 9 seconds remain
          if (prevTime === 9) {
            const tickingSound = new Audio(clockTickingSound);
            tickingSound.currentTime = 0;
            tickingSound.play().catch((error: unknown) => {
              console.log("Audio play failed:", error);
            });
          }

          if (prevTime <= 1) {
            // Timer has finished, determine what happens next
            if (sessionType === "work") {
              // Work session finished, check if this was the last session
              if (currentSession >= timerSettings.sessions) {
                // All sessions completed - play finish sound
                const finishAudio = new Audio(finishSound);
                finishAudio.play().catch((error: unknown) => {
                  console.log("Finish sound play failed:", error);
                });
                
                // Reset everything
                setIsPlaying(false);
                setFocusMode(false);
                setCurrentSession(1);
                setSessionType("work");
                return timerSettings.workDuration * 60;
              } else {
                // More sessions to go - play in-between sound and switch to break
                const inBetweenAudio = new Audio(inBetweenSound);
                inBetweenAudio.play().catch((error: unknown) => {
                  console.log("In-between sound play failed:", error);
                });
                
                setSessionType("break");
                return timerSettings.breakDuration * 60;
              }
            } else {
              // Break finished - play in-between sound and switch to next work session
              const inBetweenAudio = new Audio(inBetweenSound);
              inBetweenAudio.play().catch((error: unknown) => {
                console.log("In-between sound play failed:", error);
              });
              
              setCurrentSession(prev => prev + 1);
              setSessionType("work");
              return timerSettings.workDuration * 60;
            }
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
    currentSession,
    timerSettings.breakDuration,
    timerSettings.workDuration,
    timerSettings.autoStart,
    timerSettings.sessions,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTimer = () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    setFocusMode(newPlayingState);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setFocusMode(false);
    setCurrentSession(1);
    setSessionType("work");
    const newDuration = timerSettings.workDuration * 60;
    setRemainingTime(newDuration);
  };

  return (
    <div className="timer-wrapper">
      {/* Animated timer container */}
      <motion.div
        className="timer-container"
        animate={{
          scale: focusMode ? (isMobile ? 1.25 : 1.05) : 1,
          y: focusMode ? (isMobile ? 100 : -20) : 0,
          x: focusMode ? (isMobile ? 0 : "clamp(275px, 10vw, 80px)") : 0,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
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
