/* eslint-disable */

import { User } from '@/types/User';
import { Subject } from '@/types/Subject';

export class SubjectService {
  
  public static async getByUser(user: User): Promise<Subject[]> {
    return Promise.resolve([
      { name: 'CDIV', code: 1455, credits: 10 },
      { name: 'CDIVV', code: 1351, credits: 10 },
    ]);
  }
  
  public static async getSubject(id: number): Promise<Subject> {
    const RAILS_API_URL = process.env.RAILS_API_URL;

    if (!RAILS_API_URL) {
      throw new Error('RAILS_API_URL is not defined');
    }

    const URL = process.env.RAILS_API_URL + '/subjects/' + id;

    const res = await fetch(URL);
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.errors);
    }

    return json as Subject;
  }
}
