import { ApiCommunicator } from '@/services/ApiCommunicator';

export class AuthService {
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
      url: '/users/signup',
      method: 'POST',
      data: dataToSend,
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
      url: '/users/login',
      method: 'POST',
      data: dataToSend,
      withCredentials: true,
    });
  }
}
