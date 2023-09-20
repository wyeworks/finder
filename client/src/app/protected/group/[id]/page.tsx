import { StudyGroup } from '@/types/StudyGroup';
import Image from 'next/image';
import GroupInfo from './GroupInfo';

type Props = {
  params: {
    id: string;
  };
};

// eslint-disable-next-line no-unused-vars
export default async function Page({ params }: Props) {
  const testGroup: StudyGroup = {
    name: 'Lab Bases de Datos 2023',
    description:
      'Buscamos gente para las entregas de laboratorio y estudiar en grupo. Son invitados a sumarse!',
    subject: 'Fundamentos de Bases de Datos',
    size: 3,
    days: 'Monday',
  };

  return (
    <div className='grid h-screen w-full grid-rows-4 flex-col bg-transparent'>
      <div className='row-span-1'>
        <Image
          src='/default_group_banner.png'
          alt='Banner'
          width={1920}
          height={1080}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='row-span-1'>
        <GroupInfo group={testGroup} />
      </div>
      <div className='row-span-2 flex-grow overflow-y-auto'></div>
    </div>
  );
}
