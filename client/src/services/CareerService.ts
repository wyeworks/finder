import { User } from '@/types/User';
import { Career } from '@/types/Career';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export class CareerService {
  public static async getByUser(user: User): Promise<Career[]> {
    return (await ApiCommunicator.getCareersByUser(user.id)) as Career[];
  }
}
