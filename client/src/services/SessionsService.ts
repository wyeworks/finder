import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Logger } from './Logger';
import { Session } from '@/types/Session';

type CreateSessionData = {
  name: string;
  description: string;
  location: string;
  meeting_link: string;
  start_time: string;
  end_time: string;
  group_id: number;
};

export class SessionService {
  public static async createSession(
    data: CreateSessionData,
    accessToken: string
  ): Promise<string> {
    const response = await ApiCommunicator.commonFetch({
      url: '/sessions',
      method: 'POST',
      data,
      accessToken,
    });
    const body = await response.json();
    return body.id;
  }

  public static async getSessions(
    groupId: string,
    accessToken: string
  ): Promise<any[] | null> {
    try {
      const response = await ApiCommunicator.commonFetch({
        url: '/sessions/' + groupId,
        method: 'GET',
        accessToken,
      });

      return await response.json();
    } catch (error) {
      Logger.debug('Error trying to get sessions: ' + error);
      return null;
    }
  }

  public static async getSession(
    sessionId: string,
    accessToken: string
  ): Promise<Session | null> {
    try {
      const response = await ApiCommunicator.commonFetch({
        url: '/sessions/' + sessionId,
        method: 'GET',
        accessToken,
      });

      return await response.json();
    } catch (error) {
      Logger.debug('Error trying to get session: ' + error);
      return null;
    }
  }
}
