import { User } from '@/types/User';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Career } from '@/types/Career';
import { Logger } from '@/services/Logger';
import { Session } from 'next-auth';
import { SocialNetworks } from '@/types/SocialNetworks';

export class UserService {
  ////////////// AUTHENTICATION ////////////////////////
  public static async signUp(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<Response> {
    const dataToSend = {
      user: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    };
    return await ApiCommunicator.commonFetch({
      url: `${ApiCommunicator.api()}/users/signup`,
      method: 'POST',
      data: dataToSend,
      asJSON: false,
      handleNotOk: false,
    });
  }

  public static async login(data: {
    email: string;
    password: string;
  }): Promise<Response> {
    const dataToSend = {
      user: {
        email: data.email,
        password: data.password,
      },
    };

    return await ApiCommunicator.commonFetch({
      url: `${ApiCommunicator.api()}/users/login`,
      method: 'POST',
      data: dataToSend,
      withCredentials: true,
      asJSON: false,
      handleNotOk: false,
    });
  }

  ////////////////////////////////////////////////////////

  public static async getUser(session: Session): Promise<User> {
    let userInBD = await ApiCommunicator.commonFetch({
      url: `${ApiCommunicator.api()}/users/${session.user.id}`,
      method: 'GET',
      mustBeAuthenticated: true,
      accessToken: session.user.accessToken,
    });
    userInBD.accessToken = session.user.accessToken;
    Logger.debug('User in BD', userInBD);
    return userInBD as User;
  }

  public static async modifyPassword(
    user: User,
    currentPassword: string,
    newPassword: string
  ): Promise<any> {
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
