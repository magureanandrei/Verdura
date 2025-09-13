import type { SessionSettings } from "./SessionSettings";

export interface PresetSettings {
  id: string;
  name: string;
  settings: SessionSettings;
}