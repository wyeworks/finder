import { StudyGroup, TimeOfDay, TimePreference } from '@/types/StudyGroup';
import { StudySessionBuilder } from './StudySessionBuilder';
import { SubjectBuilder } from './SubjectBuilder';

export class StudyGroupBuilder {
  private readonly id?: number;
  private readonly name: string;
  private readonly description: string;
  private readonly subject_id: number;
  private readonly subject_name?: string;
  private readonly size?: number;
  private readonly time_preferences?: TimePreference;
  private readonly isLab: boolean;
  private readonly banner?: string;
  private readonly user_ids?: number[];
  private readonly sessions: StudySessionBuilder[];
  private readonly admin_ids?: number[];

  private constructor(
    name: string,
    description: string,
    subject_id: number,
    isLab: boolean,
    banner?: string,
    id?: number,
    subject_name?: string,
    size?: number,
    time_preferences?: TimePreference,
    user_ids?: number[],
    sessions?: StudySessionBuilder[],
    admin_ids?: number[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.subject_id = subject_id;
    this.subject_name = subject_name;
    this.size = size;
    this.time_preferences = time_preferences;
    this.isLab = isLab;
    this.banner = banner;
    this.user_ids = user_ids;
    this.sessions = sessions ?? [];
    this.admin_ids = admin_ids;
  }

  static aStudyGroup(): StudyGroupBuilder {
    const subject = SubjectBuilder.aSubject().build();
    return new StudyGroupBuilder(
      'test',
      'test',
      subject.id,
      false,
      undefined,
      1,
      subject.name,
      2,
      {
        Monday: TimeOfDay.NoPreferences,
        Tuesday: TimeOfDay.NoPreferences,
        Wednesday: TimeOfDay.NoPreferences,
        Thursday: TimeOfDay.NoPreferences,
        Friday: TimeOfDay.NoPreferences,
        Saturday: TimeOfDay.NoPreferences,
        Sunday: TimeOfDay.NoPreferences,
      },
      [1, 2, 3],
      [StudySessionBuilder.aSession()],
      [1, 2, 3]
    );
  }

  withId(id: number): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      this.isLab,
      this.banner,
      id,
      this.subject_name,
      this.size,
      this.time_preferences,
      this.user_ids,
      this.sessions,
      this.admin_ids
    );
  }

  withName(name: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      name,
      this.description,
      this.subject_id,
      this.isLab,
      this.banner,
      this.id,
      this.subject_name,
      this.size,
      this.time_preferences,
      this.user_ids,
      this.sessions,
      this.admin_ids
    );
  }

  withDescription(description: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      description,
      this.subject_id,
      this.isLab,
      this.banner,
      this.id,
      this.subject_name,
      this.size,
      this.time_preferences,
      this.user_ids,
      this.sessions,
      this.admin_ids
    );
  }

  withSubjectId(subject_id: number): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      subject_id,
      this.isLab,
      this.banner,
      this.id,
      this.subject_name,
      this.size,
      this.time_preferences,
      this.user_ids,
      this.sessions,
      this.admin_ids
    );
  }

  withSubjectName(subject_name: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      this.isLab,
      this.banner,
      this.id,
      subject_name,
      this.size,
      this.time_preferences,
      this.user_ids,
      this.sessions,
      this.admin_ids
    );
  }

  withSize(size: number): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      this.isLab,
      this.banner,
      this.id,
      this.subject_name,
      size,
      this.time_preferences,
      this.user_ids,
      this.sessions,
      this.admin_ids
    );
  }

  withTimePreferences(time_preferences: TimePreference): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      this.isLab,
      this.banner,
      this.id,
      this.subject_name,
      this.size,
      time_preferences,
      this.user_ids,
      this.sessions,
      this.admin_ids
    );
  }

  withIsLab(isLab: boolean): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      isLab,
      this.banner,
      this.id,
      this.subject_name,
      this.size,
      this.time_preferences,
      this.user_ids,
      this.sessions,
      this.admin_ids
    );
  }

  withBanner(banner: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      this.isLab,
      banner,
      this.id,
      this.subject_name,
      this.size,
      this.time_preferences,
      this.user_ids,
      this.sessions,
      this.admin_ids
    );
  }

  withUserIds(user_ids: number[]): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      this.isLab,
      this.banner,
      this.id,
      this.subject_name,
      this.size,
      this.time_preferences,
      user_ids,
      this.sessions,
      this.admin_ids
    );
  }

  withSessions(sessions: StudySessionBuilder[]): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      this.isLab,
      this.banner,
      this.id,
      this.subject_name,
      this.size,
      this.time_preferences,
      this.user_ids,
      sessions,
      this.admin_ids
    );
  }

  withAdminIds(admin_ids: number[]): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      this.isLab,
      this.banner,
      this.id,
      this.subject_name,
      this.size,
      this.time_preferences,
      this.user_ids,
      this.sessions,
      admin_ids
    );
  }

  build(): StudyGroup {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      subject_id: this.subject_id,
      subject_name: this.subject_name,
      size: this.size,
      time_preferences: this.time_preferences,
      isLab: this.isLab,
      banner: this.banner,
      user_ids: this.user_ids,
      sessions: this.sessions.map((session) => session.build()),
      admin_ids: this.admin_ids,
    };
  }
}
