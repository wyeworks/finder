import { Subject } from '@/types/Subject';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export class SubjectService {
  public static async getById(
    id: number,
    accessToken: string
  ): Promise<Subject> {
    const response = await ApiCommunicator.commonFetch({
      url: `/subjects/${id}`,
      method: 'GET',
      accessToken,
    });

    return await response.json();
  }

  public static async getAll(accessToken: string): Promise<Subject[]> {
    const response = await ApiCommunicator.commonFetch({
      url: '/subjects',
      method: 'GET',
      accessToken,
    });

    return await response.json();
  }
}
