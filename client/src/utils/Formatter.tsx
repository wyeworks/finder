import { Subject } from '@/types/Subject';
import { Option } from '@/types/Option';

import DiscordIcon from '@/assets/Icons/DiscordIcon';
import FacebookIcon from '@/assets/Icons/FacebookIcon';
import InstagramIcon from '@/assets/Icons/InstagramIcon';
import LinkedInIcon from '@/assets/Icons/LinkedInIcon';
import RedditIcon from '@/assets/Icons/RedditIcon';
import TwitterIcon from '@/assets/Icons/TwitterIcon';

// takes date from back (for example '2023-09-13T00:00:00.000Z') and
// returns on input format (2023-09-13)
export function formatDate(sDate: string) {
  return sDate.split('T')[0];
}

// this functions remove ascents to filter well
export function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function parseSubjectToOption(subjects: Subject[]): Option[] {
  const options: Option[] = subjects.map((subject) => ({
    label: subject.name,
    key: subject.id.toString(),
  }));
  return options;
}

export function returnSocialNetworkIcon(value: string) {
  switch (value) {
    case 'linkedin':
      return <LinkedInIcon className='h-8 w-8 text-inputTextColor' />;
    case 'reddit':
      return <RedditIcon className='h-8 w-8 text-inputTextColor' />;
    case 'discord':
      return <DiscordIcon className='h-8 w-8 text-inputTextColor' />;
    case 'facebook':
      return <FacebookIcon className='h-8 w-8 text-inputTextColor' />;
    case 'twitter':
      return <TwitterIcon className='h-8 w-8 text-inputTextColor' />;
    case 'instagram':
      return <InstagramIcon className='h-8 w-8 text-inputTextColor' />;
  }
}
