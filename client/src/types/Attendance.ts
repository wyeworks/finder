export type Attendance = {
  id: number;
  session_id: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
  member_id: number;
  member_name: string;
  user_id: number;
};
