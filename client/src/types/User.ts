import { SocialNetworks } from '@/types/SocialNetworks';

export type User = {
  name: string;
  email: string;
  bio: string;
  socialNetworks: SocialNetworks;
};
