import { User } from '@/types/User';
import { Career } from '@/types/Career';

export class CareerService {
  public static async getByUser(user: User): Promise<Career[]> {
    const RAILS_API_URL = process.env.RAILS_API_URL;

    if (!RAILS_API_URL) {
      throw new Error('RAILS_API_URL is not defined');
    }

    const URL = process.env.RAILS_API_URL + '/users/' + user.id + '/careers';

    const res = await fetch(URL);
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.errors);
    }

    return json as Career[];
  }
}
