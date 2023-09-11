// eslint-disable-next-line no-unused-vars
import { Session } from 'next-auth';

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    apiJwt: JWT;
  }
}
