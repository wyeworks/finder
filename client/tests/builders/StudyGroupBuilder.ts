//export type StudyGroup = {
//   name: string;
//   description: string;
//   subject: string;
//   isLab: boolean;
//   banner?: string;
// };

import { StudyGroup } from '@/types/StudyGroup';

export class StudyGroupBuilder {
  private readonly name: string;
  private readonly description: string;
  private readonly subject: string;
  private readonly isLab: boolean;
  private readonly banner?: string;

  private constructor(
    name: string,
    description: string,
    subject: string,
    isLab: boolean,
    banner?: string
  ) {
    this.name = name;
    this.description = description;
    this.subject = subject;
    this.isLab = isLab;
    this.banner = banner;
  }

  static aStudyGroup(): StudyGroupBuilder {
    return new StudyGroupBuilder(
      'name',
      'description',
      'subject',
      true,
      undefined
    );
  }

  withName(name: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      name,
      this.description,
      this.subject,
      this.isLab,
      this.banner
    );
  }

  withDescription(description: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      description,
      this.subject,
      this.isLab,
      this.banner
    );
  }

  withSubject(subject: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      subject,
      this.isLab,
      this.banner
    );
  }

  withIsLab(isLab: boolean): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject,
      isLab,
      this.banner
    );
  }

  withBanner(banner?: string): StudyGroupBuilder {
    return new StudyGroupBuilder(
      this.name,
      this.description,
      this.subject,
      this.isLab,
      banner
    );
  }

  build(): StudyGroup {
    return {
      name: this.name,
      description: this.description,
      subject: this.subject,
      isLab: this.isLab,
      banner: this.banner,
    };
  }
}
