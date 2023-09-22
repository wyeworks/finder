/* eslint-disable */

export enum TimeOfDay {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Night = 'Night',
  None = 'None',
}

export type TimePreference = {
  Sunday: TimeOfDay;
  Monday: TimeOfDay;
  Tuesday: TimeOfDay;
  Wednesday: TimeOfDay;
  Thursday: TimeOfDay;
  Friday: TimeOfDay;
  Saturday: TimeOfDay;
};

export type StudyGroup = {
  id?: number;
  name: string;
  description?: string;
  subject: string;
  size?: number;
  time_preference?: TimePreference;
  isLab?: boolean;
  banner?: string;
};
