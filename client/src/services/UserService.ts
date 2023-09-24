import { User } from '@/types/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export class UserService {
  public static async getUser(id: string): Promise<User> {
    const session = await getServerSession(authOptions);
    const RAILS_API_URL = process.env.RAILS_API_URL;

    if (!RAILS_API_URL) {
      throw new Error('RAILS_API_URL is not defined');
    }

    if (!session?.user.accessToken) {
      throw new Error('Access token is not defined');
    }

    const URL = process.env.RAILS_API_URL + '/users/' + id;

    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: session?.user.accessToken,
      },
    });
    let json: any = await res.json();
    return (await json) as User;
  }
}
