import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession`, `getServerSession` and received as a prop on the `SessionProvider` React Context
   */

  // eslint-disable-next-line no-unused-vars
  interface User extends DefaultUser {
    id?: string;
    accessToken?: string;
  }
  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    user: User;
  }
}
