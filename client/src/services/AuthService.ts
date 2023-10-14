import { ApiCommunicator } from '@/services/ApiCommunicator';

export class AuthService {
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
}
