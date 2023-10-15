import { User } from '@/types/User';
import { Subject } from '@/types/Subject';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export class SubjectService {
  public static async getByUser(
    user: User,
    accessToken: string
  ): Promise<Subject[]> {
    console.log({ u: user.id });

    const response = await ApiCommunicator.commonFetch({
      url:
        process.env.NEXT_PUBLIC_RAILS_API_URL +
        '/users/' +
        user.id +
        '/subjects',
      method: 'GET',
      accessToken,
    });

    return response as Subject[];
  }

  public static async getById(
    id: number,
    accessToken: string
  ): Promise<Subject> {
    const response = await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + `/subjects/${id}`,
      method: 'GET',
      accessToken,
    });

    return response as Subject;
  }

  public static async getAll(accessToken: string): Promise<Subject[]> {
    const response = await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + `/subjects`,
      method: 'GET',
      accessToken,
    });

    return response as Subject[];
  }
}
