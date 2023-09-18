import { Group } from '@/types/Group';
import Image from 'next/image';
import GroupInfo from './GroupInfo';

// const getGroup = async (id: string) => {
//     const RAILS_API_URL = process.env.RAILS_API_URL;

//     if (!RAILS_API_URL) {
//         throw new Error('RAILS_API_URL is not defined');
//     }

//     const URL = process.env.RAILS_API_URL + '/group/' + id;

//     try {
//         const response = await fetch(URL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });

//     } catch (error) {

//     }

//     return {}
// };

type Props = {
  params: {
    id: string;
  };
};

// eslint-disable-next-line no-unused-vars
export default async function Page({ params }: Props) {
  const testGroup: Group = {
    name: 'Lab Bases de Datos 2023',
    description:
      'Buscamos gente para las entregas de laboratorio y estudiar en grupo. Son invitados a sumarse!',
    course: 'Fundamentos de Bases de Datos',
    size: 3,
    days: 'Monday',
  };

  return (
    <div className='flex grid h-screen w-full grid-rows-4 flex-col bg-transparent'>
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
