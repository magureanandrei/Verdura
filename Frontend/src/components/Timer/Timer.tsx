import { useState, useEffect } from "react";
import type { DefaultTimerSettings } from "../../interfaces/DefaultTimerSettings";
import "./Timer.css";
import CircularTimer from "../CircluarTimer/CircularTimer";

const DEFAULT_TIMER_SETTINGS: DefaultTimerSettings = {
  workDuration: 1,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
};

export default function Timer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    DEFAULT_TIMER_SETTINGS.workDuration * 60
  );
  const [sessionType, setSessionType] = useState<
    "work" | "shortBreak" | "longBreak"
  >("work");

  const totalDuration = DEFAULT_TIMER_SETTINGS.workDuration * 60;
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
            setIsPlaying(false);
            setSessionType(sessionType === 'work' ? 'shortBreak' : 'work');
            return sessionType === 'work' 
              ? DEFAULT_TIMER_SETTINGS.shortBreakDuration * 60 
              : DEFAULT_TIMER_SETTINGS.workDuration * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, remainingTime, sessionType]);

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setRemainingTime(totalDuration);
  };

  return (
    <div className="timer-wrapper">
      <div className="timer-container">
        <div className="timer-circle-overlay">
          <CircularTimer
            progress={progress}
            timeText={formatTime(remainingTime)}
            sessionType={sessionType}
            isRunning={isPlaying}
          />
        </div>

        <div className="timer-content">
          <div className="timer-controls">
            {!isPlaying ? (
              <button className="timer-button" onClick={handleStart}>
                ▶️ Start
              </button>
            ) : (
              <button className="timer-button" onClick={handlePause}>
                ⏸️ Pause
              </button>
            )}
            <button className="timer-button" onClick={handleReset}>
              🔄 Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
