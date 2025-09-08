import React from 'react';
import './CircularTimer.css';

interface CircularTimerProps {
  progress: number;
  timeText: string;
  sessionType: 'work' | 'shortBreak' | 'longBreak';
  isRunning: boolean;
}

const CircularTimer: React.FC<CircularTimerProps> = ({ progress, timeText, sessionType, isRunning }) => {
  const radius = 120;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getSessionColor = () => {
    switch (sessionType) {
      case 'work': return '#1b5e20'; // Dark green
      case 'shortBreak': return '#2e7d32'; // Medium green
      case 'longBreak': return '#388e3c'; // Lighter green
      default: return '#1b5e20';
    }
  };

  const getGlowColor = () => {
    switch (sessionType) {
      case 'work': return 'rgba(27, 94, 32, 0.3)';
      case 'shortBreak': return 'rgba(46, 125, 50, 0.3)';
      case 'longBreak': return 'rgba(56, 142, 60, 0.3)';
      default: return 'rgba(27, 94, 32, 0.3)';
    }
  };

  return (
    <div className="circular-timer">
      {/* Outer glow ring when running */}
      {isRunning && (
        <div 
          className="timer-glow"
          style={{
            background: `radial-gradient(circle, ${getGlowColor()} 0%, transparent 70%)`,
          }}
        />
      )}
      
      {/* Background Circle */}
      <svg
        height={radius * 2}
        width={radius * 2}
        className="timer-svg"
      >
        {/* Background track */}
        <circle
          stroke="#e2e8f0"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="timer-track"
        />
        
        {/* Progress circle */}
        <circle
          stroke={getSessionColor()}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ 
            strokeDashoffset,
            filter: isRunning ? 'drop-shadow(0 0 8px rgba(27, 94, 32, 0.4))' : 'none'
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="timer-progress"
        />
      </svg>
      
      {/* Center Content */}
      <div className="timer-content">
        <div className={`timer-text ${isRunning ? 'timer-text-running' : 'timer-text-stopped'}`}>
          {timeText}
        </div>
        <div className={`timer-label ${isRunning ? 'timer-label-running' : 'timer-label-stopped'}`}>
          {sessionType === 'shortBreak' ? 'Short Break' : 
           sessionType === 'longBreak' ? 'Long Break' : sessionType}
        </div>
        
        {/* Inner pulse effect when running */}
        {isRunning && (
          <div 
            className="timer-pulse"
            style={{ backgroundColor: getSessionColor() }}
          />
        )}
      </div>
      
      {/* Quarter dots around the circle (4 dots at 12, 3, 6, 9 o'clock) */}
      <div className="timer-dots">
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * 90) * (Math.PI / 180); // 90 degrees apart
          const x = radius + (radius - 25) * Math.cos(angle - Math.PI / 2);
          const y = radius + (radius - 25) * Math.sin(angle - Math.PI / 2);
          const isActive = progress >= (i * 25); // Each quarter represents 25% progress
          return (
            <div
              key={i}
              className={`timer-dot ${isActive ? 'timer-dot-active' : 'timer-dot-inactive'}`}
              style={{
                left: x - 6,
                top: y - 6,
                backgroundColor: isActive ? getSessionColor() : '#cbd5e1',
                boxShadow: isActive && isRunning ? `0 0 8px ${getGlowColor()}` : 'none'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CircularTimer;