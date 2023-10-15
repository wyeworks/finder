import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Career } from '@/types/Career';

export class CareerService {
  static async getCareers(accessToken: string): Promise<Career[]> {
    return await (
      await ApiCommunicator.commonFetch({
        url: '/careers',
        accessToken,
        method: 'GET',
      })
    ).json();
  }
}
