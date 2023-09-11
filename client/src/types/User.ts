import { SocialNetworks } from '@/types/SocialNetworks';

export type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  socialNetworks?: SocialNetworks;
};
