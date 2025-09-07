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

// Timer colors - same as the circular timer
const TIMER_COLORS = ["#1B4332", "#40916C", "#EE9B00", "#AE2012"];

export default function Timer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [currentColor, setCurrentColor] = useState<string>(TIMER_COLORS[0]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

 const getCurrentColor = (remainingTime: number): string => {
  const totalDuration = DEFAULT_TIMER_SETTINGS.workDuration * 60;
  
  // Calculate proportional thresholds in seconds for your timer duration
  const threshold1 = (7/10) * totalDuration; // 42 seconds for 1-minute timer
  const threshold2 = (5/10) * totalDuration; // 30 seconds for 1-minute timer  
  const threshold3 = (2/10) * totalDuration; // 12 seconds for 1-minute timer
  
  if (remainingTime >= threshold1) {
    return TIMER_COLORS[0]; // Green
  } else if (remainingTime >= threshold2) {
    return TIMER_COLORS[1]; // Light green
  } else if (remainingTime >= threshold3) {
    return TIMER_COLORS[2]; // Orange
  } else {
    return TIMER_COLORS[3]; // Red
  }
};

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setKey((prevKey) => prevKey + 1);
    setCurrentColor(TIMER_COLORS[0]); // Reset to initial color
  };

  return (
    <div className="timer-wrapper">
      <div 
        className="timer-container"
        style={{
          backgroundColor: currentColor,
        }}
      >
        {/* Circular timer overlay */}
        <div className="timer-circle-overlay">
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={DEFAULT_TIMER_SETTINGS.workDuration * 60}
            colors={["#1B4332", "#40916C", "#EE9B00", "#AE2012"] as const}
            colorsTime={[
              (7/10) * DEFAULT_TIMER_SETTINGS.workDuration * 60,
              (5/10) * DEFAULT_TIMER_SETTINGS.workDuration * 60,
              (2/10) * DEFAULT_TIMER_SETTINGS.workDuration * 60,
              0
            ]}
            size={280}
            strokeWidth={8}
            onUpdate={(remainingTime: number) => {
              const newColor = getCurrentColor(remainingTime);
              if (newColor !== currentColor) {
                setCurrentColor(newColor);
              }
            }}
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