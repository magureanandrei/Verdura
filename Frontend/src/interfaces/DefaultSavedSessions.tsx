import type { SavedSessionSettings } from "./SavedSessionsSettings";

export const defaultSavedSessions: SavedSessionSettings[] = [
  {
    name: "Classic Session",
    settings: {
      id: "classic",
      sessionName: "Classic Session",
      workDuration: 25,
      breakDuration: 5,
      sessions: 4,
      autoStart: true,
      saveSession: false,
    },
  },
  {
    name: "Short Session",
    settings: {
      id: "short",
      sessionName: "Short Session",
      workDuration: 15,
      breakDuration: 3,
      sessions: 3,
      autoStart: true,
      saveSession: false,
    },
  },
  {
    name: "Extended Focus",
    settings: {
      id: "extended",
      sessionName: "Extended Focus",
      workDuration: 50,
      breakDuration: 10,
      sessions: 2,
      autoStart: true,
      saveSession: false,
    },
  },
];
