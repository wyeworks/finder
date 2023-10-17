import { Subject } from '@/types/Subject';
import { Option } from '@/types/Option';

import DiscordIcon from '@/assets/Icons/DiscordIcon';
import FacebookIcon from '@/assets/Icons/FacebookIcon';
import InstagramIcon from '@/assets/Icons/InstagramIcon';
import LinkedInIcon from '@/assets/Icons/LinkedInIcon';
import RedditIcon from '@/assets/Icons/RedditIcon';
import TwitterIcon from '@/assets/Icons/TwitterIcon';
import { TimeOfDay } from '@/types/StudyGroup';
import { Career } from '@/types/Career';
import TelegramIcon from '@/assets/Icons/TelegramIcon';
import WhatsappIcon from '@/assets/Icons/WhatsappIcon';

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
  return subjects.map((subject) => ({
    label: subject.name + ' (' + subject.code + ')',
    key: subject.id.toString(),
  }));
}

export function parseCareerToOption(careers: Career[]): Option[] {
  return careers.map((career) => ({
    label: career.name,
    key: career.id.toString(),
  }));
}

export function returnSocialNetworkIcon(value: string) {
  const socialNetworkIcons = {
    linkedin: <LinkedInIcon className='h-8 w-8 text-inputTextColor' />,
    reddit: <RedditIcon className='h-8 w-8 text-inputTextColor' />,
    discord: <DiscordIcon className='h-8 w-8 text-inputTextColor' />,
    facebook: <FacebookIcon className='h-8 w-8 text-inputTextColor' />,
    twitter: <TwitterIcon className='h-8 w-8 text-inputTextColor' />,
    instagram: <InstagramIcon className='h-8 w-8 text-inputTextColor' />,
    telegram: <TelegramIcon className='h-8 w-8 text-inputTextColor' />,
    whatsapp: <WhatsappIcon className='h-8 w-8 text-inputTextColor' />,
  };

  return socialNetworkIcons[value.toLowerCase() as keyof React.ReactNode];
}

export const translatePreference = (preference: TimeOfDay): string => {
  const preferences = {
    [TimeOfDay.Morning]: 'Mañana',
    [TimeOfDay.Afternoon]: 'Tarde',
    [TimeOfDay.Night]: 'Noche',
    [TimeOfDay.NoPreferences]: 'Sin preferencia',
    [TimeOfDay.No]: 'No puedo',
  };

  return preferences[preference];
};

export const translateSpanishDays: { [key: string]: string } = {
  Lunes: 'Monday',
  Martes: 'Tuesday',
  Miércoles: 'Wednesday',
  Jueves: 'Thursday',
  Viernes: 'Friday',
  Sábado: 'Saturday',
  Domingo: 'Sunday',
};

export const translateEnglishDays: { [key: string]: string } = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  Sunday: 'Domingo',
};
