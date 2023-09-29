import { SocialNetworks } from '@/types/SocialNetworks';
import { User } from '@/types/User';

export class UserBuilder {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;
  private readonly profileImage?: string;
  private readonly bio?: string;
  private readonly socialNetworks?: SocialNetworksBuilder;

  constructor(
    id: string,
    name: string,
    email: string,
    profileImage?: string,
    bio?: string,
    socialNetworks?: SocialNetworksBuilder
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.profileImage = profileImage;
    this.bio = bio;
    this.socialNetworks = socialNetworks;
  }

  static aUser() {
    return new UserBuilder(
      '1',
      'Juan Perez',
      'juan.peres@fing.com.uy',
      'https://www.gravatar.com/av',
      undefined,
      undefined
    );
  }

  withId(id: string): UserBuilder {
    return new UserBuilder(
      id,
      this.name,
      this.email,
      this.profileImage,
      this.bio,
      this.socialNetworks
    );
  }

  withName(name: string): UserBuilder {
    return new UserBuilder(
      this.id,
      name,
      this.email,
      this.profileImage,
      this.bio,
      this.socialNetworks
    );
  }

  withEmail(email: string): UserBuilder {
    return new UserBuilder(
      this.id,
      this.name,
      email,
      this.profileImage,
      this.bio,
      this.socialNetworks
    );
  }

  withProfileImage(profileImage?: string): UserBuilder {
    return new UserBuilder(
      this.id,
      this.name,
      this.email,
      profileImage,
      this.bio,
      this.socialNetworks
    );
  }

  withBio(bio?: string): UserBuilder {
    return new UserBuilder(
      this.id,
      this.name,
      this.email,
      this.profileImage,
      bio,
      this.socialNetworks
    );
  }

  withSocialNetworks(socialNetworks?: SocialNetworksBuilder): UserBuilder {
    return new UserBuilder(
      this.id,
      this.name,
      this.email,
      this.profileImage,
      this.bio,
      socialNetworks
    );
  }

  build(): User {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      profileImage: this.profileImage,
      bio: this.bio,
      social_networks: this.socialNetworks?.build(),
    };
  }
}

export class SocialNetworksBuilder {
  private readonly instagram?: string;
  private readonly linkedin?: string;
  private readonly twitter?: string;
  private readonly discord?: string;

  private constructor(
    instagram?: string,
    linkedin?: string,
    twitter?: string,
    discord?: string
  ) {
    this.instagram = instagram;
    this.linkedin = linkedin;
    this.twitter = twitter;
    this.discord = discord;
  }

  static aSocialNetworks() {
    return new SocialNetworksBuilder(
      undefined,
      undefined,
      undefined,
      undefined
    );
  }

  withInstagram(instagram: string): SocialNetworksBuilder {
    return new SocialNetworksBuilder(
      instagram,
      this.linkedin,
      this.twitter,
      this.discord
    );
  }

  withLinkedin(linkedin: string): SocialNetworksBuilder {
    return new SocialNetworksBuilder(
      this.instagram,
      linkedin,
      this.twitter,
      this.discord
    );
  }

  withTwitter(twitter: string): SocialNetworksBuilder {
    return new SocialNetworksBuilder(
      this.instagram,
      this.linkedin,
      twitter,
      this.discord
    );
  }

  withDiscord(discord: string): SocialNetworksBuilder {
    return new SocialNetworksBuilder(
      this.instagram,
      this.linkedin,
      this.twitter,
      discord
    );
  }

  build(): SocialNetworks {
    return {
      instagram: this.instagram,
      linkedin: this.linkedin,
      twitter: this.twitter,
      discord: this.discord,
    };
  }
}
