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
}
