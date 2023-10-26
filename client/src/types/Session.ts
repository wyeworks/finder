import { Attendance } from './Attendance';

export type Session = {
  id: number;
  name: string;
  description: string;
  location: string;
  meeting_link: string;
  start_time: string;
  end_time: string;
  group_id: number;
  attendances: Attendance[];
};
