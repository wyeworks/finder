import { User } from '@/types/User';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Career } from '@/types/Career';
import { Logger } from '@/services/Logger';
import { SocialNetworks } from '@/types/SocialNetworks';

export class UserService {
  public static async getUser(id: string, accessToken: string): Promise<User> {
    let userInBD = await ApiCommunicator.commonFetch({
      url: `${ApiCommunicator.api()}/users/${id}`,
      method: 'GET',
      accessToken: accessToken,
    });
    userInBD.accessToken = accessToken;
    Logger.debug('User in BD', userInBD);
    return userInBD as User;
  }

  public static async modifyPassword(
    id: string,
    accessToken: string,
    currentPassword: string,
    newPassword: string
  ): Promise<Response> {
    return await this.editUser(id, accessToken, {
      password: newPassword,
    });
  }

  public static async deleteUser(
    id: string,
    accessToken: string
  ): Promise<void> {
    return await ApiCommunicator.commonFetch({
      url: `${ApiCommunicator.api()}/users/${id}`,
      method: 'DELETE',
      asJSON: false,
      accessToken: accessToken,
    });
  }

  public static async getCareers(
    id: string,
    accessToken: string
  ): Promise<Career[]> {
    return (await ApiCommunicator.commonFetch({
      url: `${ApiCommunicator.api()}/users/${id}/careers`,
      accessToken: accessToken,
      method: 'GET',
    })) as Career[];
  }

  public static async editUser(
    id: string,
    accessToken: string,
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
      accessToken: accessToken,
      asJSON: false,
      handleNotOk: false,
    });
  }
}
