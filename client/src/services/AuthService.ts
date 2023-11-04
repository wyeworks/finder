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

  public static async forgotPassword(data: { email: string }): Promise<string> {
    const dataToSend = {
      user: {
        email: data.email,
      },
    };

    const response = await ApiCommunicator.commonFetch({
      url: '/users/password',
      method: 'POST',
      data: dataToSend,
    });

    const body = await response.json();
    return body.message;
  }

  public static async recoverPassword(data: {
    token: string;
    email: string;
    password: string;
  }): Promise<string> {
    const dataToSend = {
      user: {
        reset_password_token: data.token,
        password: data.password,
        password_confirmation: data.password,
        email: data.email,
      },
    };
    const response = await ApiCommunicator.commonFetch({
      url: '/users/password',
      method: 'PUT',
      data: dataToSend,
    });

    const body = await response.json();
    return body.message;
  }
}
