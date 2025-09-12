import { useState, useEffect } from "react";
import type { DefaultTimerSettings } from "../../interfaces/DefaultTimerSettings";
import "./Timer.css";
import CircularTimer from "../CircluarTimer/CircularTimer";
import { Play, Pause, RotateCcw } from "lucide-react";

const DEFAULT_TIMER_SETTINGS: DefaultTimerSettings = {
  workDuration: 2,
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

  const getTotalDuration = () => {
    switch (sessionType) {
      case "work":
        return DEFAULT_TIMER_SETTINGS.workDuration * 60;
      case "shortBreak":
        return DEFAULT_TIMER_SETTINGS.shortBreakDuration * 60;
      case "longBreak":
        return DEFAULT_TIMER_SETTINGS.longBreakDuration * 60;
      default:
        return DEFAULT_TIMER_SETTINGS.workDuration * 60;
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
            setIsPlaying(false);
            setSessionType(sessionType === "work" ? "shortBreak" : "work");
            return sessionType === "work"
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

  const toggleTimer = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    const newDuration =
      sessionType === "work"
        ? DEFAULT_TIMER_SETTINGS.workDuration * 60
        : sessionType === "shortBreak"
        ? DEFAULT_TIMER_SETTINGS.shortBreakDuration * 60
        : DEFAULT_TIMER_SETTINGS.longBreakDuration * 60;
    setRemainingTime(newDuration);
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
    </div>
  );
}
