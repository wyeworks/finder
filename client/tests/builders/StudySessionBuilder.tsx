import { AttendanceBuilder } from './AttendanceBuilder';
import { Session } from '@/types/Session';

export class StudySessionBuilder {
  private id: number;
  private name: string;
  private description: string | null;
  private location: string | null;
  private meeting_link: string | null;
  private start_time: string;
  private end_time: string;
  private group_id: number;
  private attendances: AttendanceBuilder[];
  private creator_id: number;
  private creator_user_id: number;

  constructor() {
    this.id = 1;
    this.name = 'test';
    this.description = 'test';
    this.location = 'test';
    this.meeting_link = 'test';
    this.start_time = 'test';
    this.end_time = 'test';
    this.group_id = 1;
    this.attendances = [AttendanceBuilder.anAttendance()];
    this.creator_id = 1;
    this.creator_user_id = 1;
  }

  public static aSession(): StudySessionBuilder {
    return new StudySessionBuilder();
  }

  public withId(id: number): StudySessionBuilder {
    this.id = id;
    return this;
  }

  public withName(name: string): StudySessionBuilder {
    this.name = name;
    return this;
  }

  public withDescription(description: string | null): StudySessionBuilder {
    this.description = description;
    return this;
  }

  public withLocation(location: string | null): StudySessionBuilder {
    this.location = location;
    return this;
  }

  public withMeetingLink(meeting_link: string | null): StudySessionBuilder {
    this.meeting_link = meeting_link;
    return this;
  }

  public withStartTime(start_time: string): StudySessionBuilder {
    this.start_time = start_time;
    return this;
  }

  public withEndTime(end_time: string): StudySessionBuilder {
    this.end_time = end_time;
    return this;
  }

  public withGroupId(group_id: number): StudySessionBuilder {
    this.group_id = group_id;
    return this;
  }

  public withAttendances(
    attendances: AttendanceBuilder[]
  ): StudySessionBuilder {
    this.attendances = attendances;
    return this;
  }

  public withCreatorId(creator_id: number): StudySessionBuilder {
    this.creator_id = creator_id;
    return this;
  }

  public withCreatorUserId(creator_user_id: number): StudySessionBuilder {
    this.creator_user_id = creator_user_id;
    return this;
  }

  public build(): Session {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      location: this.location,
      meeting_link: this.meeting_link,
      start_time: this.start_time,
      end_time: this.end_time,
      group_id: this.group_id,
      attendances: this.attendances.map((attendance) => attendance.build()),
      creator_id: this.creator_id,
      creator_user_id: this.creator_user_id,
    };
  }
}
