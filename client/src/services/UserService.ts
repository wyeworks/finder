import { User } from '@/types/User';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Career } from '@/types/Career';
import { Logger } from '@/services/Logger';
import { SocialNetworks } from '@/types/SocialNetworks';
import { Subject } from '@/types/Subject';

export class UserService {
  public static async getUser(id: string, accessToken: string): Promise<User> {
    const response = await ApiCommunicator.commonFetch({
      url: `/users/${id}`,
      method: 'GET',
      accessToken: accessToken,
    });
    let userInBD: User = await response.json();
    userInBD.accessToken = accessToken;
    Logger.debug('User in BD', userInBD);
    return userInBD;
  }

  public static async modifyPassword(
    id: string,
    accessToken: string,
    currentPassword: string,
    newPassword: string
  ): Promise<string> {
    const response = await this.editUser(id, accessToken, {
      current_password: currentPassword,
      password: newPassword,
    });
    const body = await response.json();
    return body.message;
  }

  public static async deleteUser(
    id: string,
    accessToken: string
  ): Promise<void> {
    await ApiCommunicator.commonFetch({
      url: `/users/${id}`,
      method: 'DELETE',
      accessToken: accessToken,
    });
    return;
  }

  public static async getCareers(
    id: string,
    accessToken: string
  ): Promise<Career[]> {
    const response = await ApiCommunicator.commonFetch({
      url: `/users/${id}/careers`,
      accessToken: accessToken,
      method: 'GET',
    });
    const body = await response.json();
    return body as Career[];
  }

  public static async getSubjects(
    id: string,
    accessToken: string
  ): Promise<Subject[]> {
    const response = await ApiCommunicator.commonFetch({
      url: `/users/${id}/subjects`,
      method: 'GET',
      accessToken,
    });

    return await response.json();
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
          current_password: string;
          password: string;
        }
  ): Promise<Response> {
    const dataToSend = {
      user: data,
    };

    return await ApiCommunicator.commonFetch({
      url: `/users/${id}`,
      method: 'PATCH',
      data: dataToSend,
      accessToken: accessToken,
    });
  }
}
