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
    Logger.debug('START: Common fetch');

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
    await Logger.logResponse(response);

    if (!response.ok) {
      Logger.warn(
        'Response not ok',
        'Human Readable: ',
        response.statusText,
        'Code: ',
        response.status
      );
      if (handleNotOk) {
        const errorData = await response.json();
        const errorMessage =
          errorData.errors || strings.common.error.unexpectedError;
        Logger.error('Error fetching message: ', errorMessage);
        throw new Error(errorMessage);
      }
    }

    Logger.debug('END: Returning response for common fetch');
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

  static async clientSideSubjectsByUser() {
    return await this.commonFetch({
      url: '/api/subjects',
      method: 'GET',
    });
  }

  static async clientSideCreateGroup(data: any): Promise<any> {
    return await this.commonFetch({
      url: '/api/createGroup',
      method: 'POST',
      data,
      handleNotOk: false,
      asJSON: false,
    });
  }

  static async createGroup(data: any): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + '/groups',
      method: 'POST',
      data,
      mustBeAuthenticated: true,
      asJSON: false,
    });
  }

  static async getSubjectsByUser(id: string): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + '/users/' + id + '/subjects',
      method: 'GET',
      mustBeAuthenticated: true,
      asJSON: false,
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

  static async getSubject(id: string): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + `/subjects/${id}`,
      method: 'GET',
    });
  }

  static async getSubjects(): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + `/subjects`,
      method: 'GET',
    });
  }

  static async getCareersByUser(id: string): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + `/users/${id}/careers`,
      method: 'GET',
    });
  }

  static async getGroup(id: string): Promise<any> {
    return await this.commonFetch({
      url: this.apiUrl() + `/groups/${id}`,
      method: 'GET',
    });
  }
}
