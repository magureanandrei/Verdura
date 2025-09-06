import { CountdownCircleTimer } from "react-countdown-circle-timer";
import type { DefaultTimerSettings } from "../interfaces/DefaultTimerSettings";

const DEFAULT_TIMER_SETTINGS: DefaultTimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
};

export default function Dashboard() {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
      <br />
      <CountdownCircleTimer
        isPlaying
        duration={DEFAULT_TIMER_SETTINGS.workDuration * 60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
      >
        {({ remainingTime }: { remainingTime: number }) =>
          formatTime(remainingTime)
        }
      </CountdownCircleTimer>
    </>
  );
}
