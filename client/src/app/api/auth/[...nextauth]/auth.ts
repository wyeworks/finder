import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Logger } from '@/services/Logger';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        Logger.debug('Authorizing user with credentials: ' + credentials);
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const URL = process.env.RAILS_API_URL + '/users/login';
        Logger.debug('Fetching from URL: ' + URL);
        const res = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              email,
              password,
            },
          }),
          credentials: 'include',
        });
        Logger.debug('Received response: ' + res);
        const user = await res.json();
        if (res.ok && user && user.user) {
          Logger.debug('User authorized: ' + user.user);
          user.user.accessToken = res.headers.get('Authorization');
          return user.user;
        } else {
          Logger.debug('User not authorized');
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (trigger === 'update') {
        if (session.info) {
          Logger.debug('Updating token with session info: ', session.info);
          token.user = session.info;
        }
      }

      if (trigger === 'signIn' || trigger === 'signUp') {
        if (user) {
          Logger.debug('Updating token with user: ', user);
          token.user = user;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: '/signin',
    newUser: '/signup',
  },
};
