
export interface Alarm {
  id: string;
  time: string; // HH:mm format
  label: string;
  isEnabled: boolean;
}

export interface WorldZone {
  id: string;
  city: string;
  timezone: string;
  flag: string;
}

export type ThemeMode = 'dark' | 'light';

export interface ClockSettings {
  is24Hour: boolean;
  isNeon: boolean;
  theme: ThemeMode;
  showSeconds: boolean;
}
