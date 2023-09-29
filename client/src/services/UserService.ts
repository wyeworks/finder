import { User } from '@/types/User';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export class UserService {
  public static async getUser(id: string): Promise<User> {
    return (await ApiCommunicator.getUser(id)) as User;
  }
}
