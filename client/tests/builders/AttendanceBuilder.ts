import { Attendance } from '@/types/Attendance';

export class AttendanceBuilder {
  private readonly id: number;
  private readonly session_id: number;
  private readonly status: 'pending' | 'accepted' | 'rejected';
  private readonly created_at: string;
  private readonly updated_at: string;
  private readonly member_id: number;
  private readonly member_name: string;
  private readonly user_id: number;

  private constructor(
    id: number,
    session_id: number,
    status: 'pending' | 'accepted' | 'rejected',
    created_at: string,
    updated_at: string,
    member_id: number,
    member_name: string,
    user_id: number
  ) {
    this.id = id;
    this.session_id = session_id;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.member_id = member_id;
    this.member_name = member_name;
    this.user_id = user_id;
  }

  static anAttendance(): AttendanceBuilder {
    return new AttendanceBuilder(
      1,
      1,
      'pending',
      '2021-04-10',
      '2021-04-10',
      1,
      'test',
      1
    );
  }

  withId(id: number): AttendanceBuilder {
    return new AttendanceBuilder(
      id,
      this.session_id,
      this.status,
      this.created_at,
      this.updated_at,
      this.member_id,
      this.member_name,
      this.user_id
    );
  }

  withSessionId(session_id: number): AttendanceBuilder {
    return new AttendanceBuilder(
      this.id,
      session_id,
      this.status,
      this.created_at,
      this.updated_at,
      this.member_id,
      this.member_name,
      this.user_id
    );
  }

  withStatus(status: 'pending' | 'accepted' | 'rejected'): AttendanceBuilder {
    return new AttendanceBuilder(
      this.id,
      this.session_id,
      status,
      this.created_at,
      this.updated_at,
      this.member_id,
      this.member_name,
      this.user_id
    );
  }

  withCreatedAt(created_at: string): AttendanceBuilder {
    return new AttendanceBuilder(
      this.id,
      this.session_id,
      this.status,
      created_at,
      this.updated_at,
      this.member_id,
      this.member_name,
      this.user_id
    );
  }

  withUpdatedAt(updated_at: string): AttendanceBuilder {
    return new AttendanceBuilder(
      this.id,
      this.session_id,
      this.status,
      this.created_at,
      updated_at,
      this.member_id,
      this.member_name,
      this.user_id
    );
  }

  withMemberId(member_id: number): AttendanceBuilder {
    return new AttendanceBuilder(
      this.id,
      this.session_id,
      this.status,
      this.created_at,
      this.updated_at,
      member_id,
      this.member_name,
      this.user_id
    );
  }

  withMemberName(member_name: string): AttendanceBuilder {
    return new AttendanceBuilder(
      this.id,
      this.session_id,
      this.status,
      this.created_at,
      this.updated_at,
      this.member_id,
      member_name,
      this.user_id
    );
  }

  withUserId(user_id: number): AttendanceBuilder {
    return new AttendanceBuilder(
      this.id,
      this.session_id,
      this.status,
      this.created_at,
      this.updated_at,
      this.member_id,
      this.member_name,
      user_id
    );
  }

  build(): Attendance {
    return {
      id: this.id,
      session_id: this.session_id,
      status: this.status,
      created_at: this.created_at,
      updated_at: this.updated_at,
      member_id: this.member_id,
      member_name: this.member_name,
      user_id: this.user_id,
    };
  }
}
