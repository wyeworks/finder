import strings from '@/locales/strings.json';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { Logger } from '@/services/Logger';

export class ApiCommunicator {
  static apiUrl() {
    const RAILS_API_URL = process.env.RAILS_API_URL;

    if (!RAILS_API_URL) {
      throw new Error('RAILS_API_URL is not defined');
    }

    return RAILS_API_URL;
  }

  // eslint-disable-next-line complexity
  private static async commonFetch({
    url,
    method,
    data,
    mustBeAuthenticated = false,
    withCredentials = false,
    handleNotOk = true,
    asJSON = true,
  }: {
    url: string;
    method: string;
    data?: any;
    mustBeAuthenticated?: boolean;
    withCredentials?: boolean;
    // eslint-disable-next-line no-unused-vars
    handleNotOk?: boolean;
    asJSON?: boolean;
  }): Promise<any> {
    Logger.debug('Starting common fetch');

    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (mustBeAuthenticated) {
      const session = await getServerSession(authOptions);
      if (!session?.user.accessToken) {
        Logger.warn('User not authenticated');
        throw new Error(strings.common.error.unauthorized);
      }

      headers = {
        ...headers,
        Authorization: session.user.accessToken,
      };
    }

    let fetchOptions: Record<any, any> = {
      method,
      headers,
    };

    if (data) {
      fetchOptions = {
        ...fetchOptions,
        body: JSON.stringify(data),
      };
    }

    if (withCredentials) {
      fetchOptions = {
        ...fetchOptions,
        credentials: 'include',
      };
    }

    Logger.debug('Url: ', url);
    Logger.debug('Fetching with options: ', fetchOptions);
    const response = await fetch(url, fetchOptions);

    Logger.debug('Response: ', response);
    if (!response.ok) {
      Logger.warn('Response not ok');
      if (handleNotOk) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || strings.common.error.unexpectedError
        );
      }
    }

    Logger.debug('Returning response');
    return asJSON && handleNotOk ? await response.json() : response;
  }

  static async clientSideEditUser(data: any): Promise<any> {
    return await this.commonFetch({
      url: '/api/signup',
      method: 'PATCH',
      data,
    });
  }

  static async clientSideSignUp(data: any): Promise<any> {
    return await this.commonFetch({
      url: '/api/signup',
      method: 'POST',
      data,
      handleNotOk: false,
      asJSON: false,
    });
  }

  static async getSubjects(id: string): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + '/users/' + id + '/subjects',
      method: 'GET',
      mustBeAuthenticated: true,
    });
  }

  static async getCareers(): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + '/careers',
      mustBeAuthenticated: true,
      method: 'GET',
    });
  }

  static async signUp(data: any): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + '/users/signup',
      method: 'POST',
      data,
      asJSON: false,
    });
  }

  static async editUser(data: any): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + '/users/signup',
      method: 'PATCH',
      data,
      mustBeAuthenticated: true,
      asJSON: false,
    });
  }

  static async login(data: any): Promise<any> {
    Logger.debug('Logging in');
    return await this.commonFetch({
      url: this.apiUrl() + '/users/login',
      method: 'POST',
      data,
      withCredentials: true,
      asJSON: false,
      handleNotOk: false,
    });
  }

  static async getUser(id: string): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + `/users/${id}`,
      method: 'GET',
      mustBeAuthenticated: true,
    });
  }
}
