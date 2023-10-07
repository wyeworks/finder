/* eslint-disable */

export enum TimeOfDay {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Night = 'Night',
  NoPreferences = 'None',
  No = '',
}

export type TimePreference = {
  Sunday?: TimeOfDay;
  Monday?: TimeOfDay;
  Tuesday?: TimeOfDay;
  Wednesday?: TimeOfDay;
  Thursday?: TimeOfDay;
  Friday?: TimeOfDay;
  Saturday?: TimeOfDay;
};

export type StudyGroup = {
  id?: number;
  name: string;
  description?: string;
  subject_id: number;
  size?: number;
  time_preferences?: TimePreference;
  isLab?: boolean;
  banner?: string;
  user_ids?: number[];
};
