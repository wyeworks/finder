import { User } from '@/types/User';

export class UserService {
  public static async getUser(id: string): Promise<User> {
    const RAILS_API_URL = process.env.RAILS_API_URL;

    if (!RAILS_API_URL) {
      throw new Error('RAILS_API_URL is not defined');
    }

    const URL = process.env.RAILS_API_URL + '/users/' + id;

    const res = await fetch(URL);
    let json: any = await res.json();
    return (await json) as User;
  }
}
