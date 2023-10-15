import { Logger } from '@/services/Logger';
import { NotOkError } from '@/types/NotOkError';

export class ApiCommunicator {
  static api() {
    return process.env.NEXT_PUBLIC_RAILS_API_URL;
  }

  static async commonFetch({
    url,
    method,
    data,
    withCredentials = false,
    accessToken,
  }: {
    url: string;
    method: string;
    data?: any;
    withCredentials?: boolean;
    accessToken?: string;
  }): Promise<Response> {
    const fetchUrl = `${this.api()}${url}`;
    Logger.debug('START: Common fetch');

    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
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
    Logger.debug('Url: ', fetchUrl);
    Logger.debug('Fetching with options: ', fetchOptions);
    const response = await fetch(fetchUrl, fetchOptions);
    await Logger.logResponse(response);

    if (!response.ok) {
      Logger.warn(
        'Response not ok',
        response.statusText,
        'Code: ',
        response.status
      );

      throw new NotOkError(await response.json(), response.status);
    }

    Logger.debug('END: Returning response for common fetch');
    return response;
  }
}
