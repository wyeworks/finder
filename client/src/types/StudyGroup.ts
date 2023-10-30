/* eslint-disable */
import { Session } from './Session';

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
  subject_name?: string;
  size?: number;
  time_preferences?: TimePreference;
  isLab?: boolean;
  banner?: string;
  user_ids?: number[];
  sessions: Session[];
  admin_ids?: number[];
};
