import type { PresetSettings } from "./PresetSettings";

export const defaultPresets: PresetSettings[] = [
  {
    id: "classic",
    name: "Classic Session",
    settings: {
      sessionName: "Classic Session",
      workDuration: 25,
      breakDuration: 5,
      sessions: 4,
      autoStart: true
    },
  },
  {
    id: "short-burst",
    name: "Short Session",
    settings: {
      sessionName: "Short Session",
      workDuration: 15,
      breakDuration: 3,
      sessions: 3,
      autoStart: true
    },
  },
  {
    id: "extended",
    name: "Extended Focus",
    settings: {
      sessionName: "Extended Focus",
      workDuration: 50,
      breakDuration: 10,
      sessions: 2,
      autoStart: true
    },
  },
];