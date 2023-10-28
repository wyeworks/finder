import { Attendance } from './Attendance';

export type Session = {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  meeting_link: string | null;
  start_time: string;
  end_time: string;
  group_id: number;
  attendances: Attendance[];
};
