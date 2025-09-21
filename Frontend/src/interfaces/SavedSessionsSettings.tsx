import type { CustomSettings } from "./CustomSettings";

export interface SavedSessionSettings {
  id: string;
  name: string;
  settings: CustomSettings;
}
