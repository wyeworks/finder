import { SocialNetworks } from '@/types/SocialNetworks';

export type User = {
  name: string;
  email: string;
  bio: string;
  profileImage: string;
  bannerImage: string;
  department: string;
  socialNetworks: SocialNetworks;
};