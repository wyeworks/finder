import { StudyGroup, TimeOfDay } from '@/types/StudyGroup';
import Image from 'next/image';
import GroupInfo from './GroupInfo';
import GroupTabs from './GroupTabs';

type Props = {
  params: {
    id: string;
  };
};

// eslint-disable-next-line no-unused-vars
export default function Page({ params }: Props) {
  const testGroup: StudyGroup = {
    id: 1,
    name: 'Lab Bases de Datos 2023',
    description:
      'Buscamos gente para las entregas de laboratorio y estudiar en grupo. Son invitados a sumarse!',
    subject: 'Fundamentos de Bases de Datos',
    size: 3,
    time_preference: {
      Sunday: TimeOfDay.None,
      Monday: TimeOfDay.Morning,
      Tuesday: TimeOfDay.Afternoon,
      Wednesday: TimeOfDay.Night,
      Thursday: TimeOfDay.Morning,
      Friday: TimeOfDay.Afternoon,
      Saturday: TimeOfDay.None,
    },
  };

  return (
    <div className='flex h-screen w-full flex-col'>
      <div className='h-1/4'>
        <Image
          src='/default_group_banner.png'
          alt='Banner'
          width={1920}
          height={1080}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='mb-2 flex-shrink-0'>
        <GroupInfo group={testGroup} />
      </div>
      <div className='flex-shrink-0 flex-grow'>
        <GroupTabs group={testGroup} />
      </div>
    </div>
  );
}
