import { SocialNetworks } from '@/types/SocialNetworks';
import { Career } from '@/types/Career';
import { Subject } from '@/types/Subject';
import { StudyGroup } from '@/types/StudyGroup';

export type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  groups?: StudyGroup[];
  bio?: string;
  social_networks?: SocialNetworks;
  birth_date?: string;
  careers?: Career[];
  subjects?: Subject[];
  accessToken: string;
};
