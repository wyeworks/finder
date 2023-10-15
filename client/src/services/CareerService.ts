import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Career } from '@/types/Career';

export class CareerService {
  static async getCareers(accessToken: string): Promise<Career[]> {
    return await ApiCommunicator.commonFetch({
      url: ApiCommunicator.api() + '/careers',
      accessToken,
      method: 'GET',
    });
  }
}
