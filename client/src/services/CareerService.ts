import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Career } from '@/types/Career';

export class CareerService {
  static async getCareers(accessToken: string): Promise<Career[]> {
    const response = await ApiCommunicator.commonFetch({
      url: '/careers',
      accessToken,
      method: 'GET',
    });
    return await response.json();
  }
}
