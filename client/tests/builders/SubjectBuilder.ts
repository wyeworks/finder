import { Subject } from '@/types/Subject';

export class SubjectBuilder {
  private readonly id: number;
  private readonly name: string;
  private readonly code: string;
  private readonly credits: number;

  private constructor(id: number, name: string, code: string, credits: number) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.credits = credits;
  }

  static aSubject(): SubjectBuilder {
    return new SubjectBuilder(1, 'test', 'test', 1);
  }

  withId(id: number): SubjectBuilder {
    return new SubjectBuilder(id, this.name, this.code, this.credits);
  }

  withName(name: string): SubjectBuilder {
    return new SubjectBuilder(this.id, name, this.code, this.credits);
  }

  withCode(code: string): SubjectBuilder {
    return new SubjectBuilder(this.id, this.name, code, this.credits);
  }

  withCredits(credits: number): SubjectBuilder {
    return new SubjectBuilder(this.id, this.name, this.code, credits);
  }

  build(): Subject {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      credits: this.credits,
    };
  }
}
