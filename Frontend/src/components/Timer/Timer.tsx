import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
import type { DefaultTimerSettings } from "../../interfaces/DefaultTimerSettings";
import "./Timer.css";

const DEFAULT_TIMER_SETTINGS: DefaultTimerSettings = {
  workDuration: 1,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
};

export default function Timer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setKey((prevKey) => prevKey + 1); // Force re-render of timer
  };

  return (
    <div className="timer-wrapper">
      <div className="timer-container">
        {/* Circular timer overlay */}
        <div className="timer-circle-overlay">
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={DEFAULT_TIMER_SETTINGS.workDuration * 60}
            colors={["#1B4332", "#40916C", "#EE9B00", "#AE2012"]}
            colorsTime={[7, 5, 2, 0]}
            size={280}
            strokeWidth={8}
          >
            {({ remainingTime }: { remainingTime: number }) => (
              <div className="timer-display">{formatTime(remainingTime)}</div>
            )}
          </CountdownCircleTimer>
        </div>

        {/* Controls positioned at bottom */}
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
