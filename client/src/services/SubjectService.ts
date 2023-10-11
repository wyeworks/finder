import { User } from '@/types/User';
import { Subject } from '@/types/Subject';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export class SubjectService {
  public static async getByUser(user: User): Promise<Subject[]> {
    const response = await ApiCommunicator.commonFetch({
      url:
        process.env.NEXT_PUBLIC_RAILS_API_URL +
        '/users/' +
        user.id +
        '/subjects',
      method: 'GET',
      mustBeAuthenticated: true,
    });

    return response as Subject[];
  }

  public static async getById(id: number): Promise<Subject> {
    const response = await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + `/subjects/${id}`,
      method: 'GET',
    });

    return response as Subject;
  }

  public static async getAll(): Promise<Subject[]> {
    const response = await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + `/subjects`,
      method: 'GET',
    });

    return response as Subject[];
  }
}
