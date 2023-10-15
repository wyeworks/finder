import strings from '@/locales/strings.json';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { Logger } from '@/services/Logger';

export class ApiCommunicator {
  static api() {
    return process.env.NEXT_PUBLIC_RAILS_API_URL;
  }

  // eslint-disable-next-line complexity
  static async commonFetch({
    url,
    method,
    data,
    mustBeAuthenticated = false,
    withCredentials = false,
    handleNotOk = true,
    asJSON = true,
    accessToken,
  }: {
    url: string;
    method: string;
    data?: any;
    mustBeAuthenticated?: boolean;
    withCredentials?: boolean;
    // eslint-disable-next-line no-unused-vars
    handleNotOk?: boolean;
    asJSON?: boolean;
    accessToken?: string;
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

    if (accessToken && !mustBeAuthenticated) {
      headers = {
        ...headers,
        Authorization: accessToken,
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
}
