import { SocialNetworks } from '@/types/SocialNetworks';

export type User = {
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  socialNetworks?: SocialNetworks;
};
