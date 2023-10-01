import { SocialNetworks } from '@/types/SocialNetworks';

export type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  social_networks?: SocialNetworks;
  birth_date?: string;
  career_ids?: Number[];
  subject_ids?: Number[];
};
