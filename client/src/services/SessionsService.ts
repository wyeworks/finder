import { ApiCommunicator } from '@/services/ApiCommunicator';

type CreateSessionData = {
  name: string;
  description: string;
  location: string;
  meeting_link: string;
  start_time: Date;
  end_time: Date;
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
}
