import { User } from '@/types/User';
import { User as NextAuthUser } from 'next-auth';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Career } from '@/types/Career';
import { Logger } from '@/services/Logger';
import { SocialNetworks } from '@/types/SocialNetworks';

export class UserService {
  public static async getUser(user: NextAuthUser): Promise<User> {
    let userInBD = await ApiCommunicator.commonFetch({
      url: `${ApiCommunicator.api()}/users/${user.id}`,
      method: 'GET',
      mustBeAuthenticated: true,
      accessToken: user.accessToken,
    });
    userInBD.accessToken = user.accessToken;
    Logger.debug('User in BD', userInBD);
    return userInBD as User;
  }

  public static async modifyPassword(
    user: User,
    currentPassword: string,
    newPassword: string
  ): Promise<Response> {
    return await this.editUser(user, {
      password: newPassword,
    });
  }

  public static async deleteUser(user: User): Promise<void> {
    return await ApiCommunicator.commonFetch({
      url: `${ApiCommunicator.api()}/users/${user.id}`,
      method: 'DELETE',
      asJSON: false,
      accessToken: user.accessToken,
    });
  }

  public static async getCareers(user: User): Promise<Career[]> {
    return (await ApiCommunicator.commonFetch({
      url: `${ApiCommunicator.api()}/users/${user.id}/careers`,
      accessToken: user.accessToken,
      method: 'GET',
    })) as Career[];
  }

  public static async editUser(
    user: User,
    data:
      | {
          name: string;
          bio: string;
          birth_date: string;
          social_networks: SocialNetworks;
          career_ids: Number[];
          subject_ids: Number[];
        }
      | {
          password: string;
        }
  ): Promise<Response> {
    const dataToSend = {
      user: data,
    };

    return await ApiCommunicator.commonFetch({
      url: `${ApiCommunicator.api()}/users/signup`,
      method: 'PATCH',
      data: dataToSend,
      accessToken: user.accessToken,
      asJSON: false,
      handleNotOk: false,
    });
  }
}
