import { StudyGroup } from '@/types/StudyGroup';

export class StudyGroupBuilder {
  private readonly name: string;
  private readonly description: string;
  private readonly subject_id: number;
  private readonly isLab: boolean;
  private readonly banner?: string;

  private constructor(
    name: string,
    description: string,
    subject_id: number,
    isLab: boolean,
    banner?: string
  ) {
    this.name = name;
    this.description = description;
    this.subject_id = subject_id;
    this.isLab = isLab;
    this.banner = banner;
  }

  static aStudyGroup(): StudyGroupBuilder {
    return new StudyGroupBuilder('name', 'description', 1, true, undefined);
  }

  withName(name: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      name,
      this.description,
      this.subject_id,
      this.isLab,
      this.banner
    );
  }

  withDescription(description: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      description,
      this.subject_id,
      this.isLab,
      this.banner
    );
  }

  withSubject(subject_id: number): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      subject_id,
      this.isLab,
      this.banner
    );
  }

  withIsLab(isLab: boolean): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      isLab,
      this.banner
    );
  }

  withBanner(banner?: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject_id,
      this.isLab,
      banner
    );
  }

  build(): StudyGroup {
    return {
      name: this.name,
      description: this.description,
      subject_id: this.subject_id,
      isLab: this.isLab,
      banner: this.banner,
    };
  }
}
