import { Subject } from '@/types/Subject';

export class SubjectService {
  public static async getSubject(id: number): Promise<Subject> {
    const RAILS_API_URL = process.env.RAILS_API_URL;

    if (!RAILS_API_URL) {
      throw new Error('RAILS_API_URL is not defined');
    }

    const URL = process.env.RAILS_API_URL + '/subjects/' + id;

    const res = await fetch(URL);
    let json: any = await res.json();
    return (await json) as Subject;
  }
}
