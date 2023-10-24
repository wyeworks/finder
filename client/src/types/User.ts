import { SocialNetworks } from '@/types/SocialNetworks';
import { Career } from '@/types/Career';
import { Subject } from '@/types/Subject';

export type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  groups?: GroupDetails[];
  bio?: string;
  social_networks?: SocialNetworks;
  birth_date?: string;
  careers?: Career[];
  subjects?: Subject[];
  accessToken: string;
};

export type GroupDetails = {
  id: number;
  name: string;
  description: string;
  subject: string;
};
