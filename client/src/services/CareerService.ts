/* eslint-disable */

import { User } from '@/types/User';
import { Career } from '@/types/Career';

export class CareerService {
  public static async getByUser(user: User): Promise<Career[]> {
    return Promise.resolve([
      {
        name: 'Ingeniería en Computación',
      },
      {
        name: 'Ingenieria Electrónica',
      },
    ]);
  }
}
