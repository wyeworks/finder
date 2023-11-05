import { Session } from 'next-auth';

type UserType = { id: string; name: string; accessToken: string };

export class SessionBuilder {
  private readonly user: UserType;
  private readonly expires: string;

  private constructor(user: UserType, expires: string) {
    this.user = user;
    this.expires = expires;
  }

  static aSession(): SessionBuilder {
    return new SessionBuilder(
      { id: '1', name: 'test', accessToken: 'token' },
      '11'
    );
  }

  withUser(user: UserType): SessionBuilder {
    return new SessionBuilder(user, this.expires);
  }

  withExpires(expires: string): SessionBuilder {
    return new SessionBuilder(this.user, expires);
  }

  build(): Session {
    return {
      user: this.user,
      expires: this.expires,
    };
  }
}
