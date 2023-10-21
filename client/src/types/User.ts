import { SocialNetworks } from '@/types/SocialNetworks';
import { Career } from '@/types/Career';
import { Subject } from '@/types/Subject';

export type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  social_networks?: SocialNetworks;
  birth_date?: string;
  careers?: Career[];
  subjects?: Subject[];
  accessToken: string;
};
