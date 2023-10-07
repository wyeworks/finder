import { User } from '@/types/User';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Logger } from '@/services/Logger';

export class UserService {
  public static async getUser(id: string): Promise<User> {
    return (await ApiCommunicator.getUser(id)) as User;
  }

  public static async modifyPassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<any> {
    return await ApiCommunicator.clientSideEditUser({
      newPassword: newPassword,
    });
  }

  public static async deleteUser(id: string): Promise<void> {
    Logger.debug('UserService.deleteUser', id);
    return;
  }
}
