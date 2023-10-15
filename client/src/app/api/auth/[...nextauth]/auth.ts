import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Logger } from '@/services/Logger';
import { AuthService } from '@/services/AuthService';

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
        Logger.debug('Authorizing users with credentials: ' + credentials);
        const { email, password } = credentials!;
        try {
          const res = await AuthService.login({
            email,
            password,
          });

          const user = await res.json();

          if (!user || !user.user) {
            Logger.warn('User not authorized');
            return null;
          }

          Logger.debug('User authorized: ', user.user);
          Logger.debug('User', user);
          user.user.accessToken = res.headers.get('Authorization');
          return user.user;
        } catch (error) {
          Logger.error('Error trying to authorize user: ' + error);
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
          Logger.debug('Updating token with users: ', user);
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
