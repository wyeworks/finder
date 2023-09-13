import { StudyGroup } from '@/types/StudyGroup';
import Image from 'next/image';

export default function GroupCard(props: { group: StudyGroup }) {
  const { name, description, subject } = props.group;
  return (
    <div className='m-10 flex w-[444px] flex-col overflow-hidden rounded-2xl shadow-2xl'>
      <Image
        src='/default_group_banner.png'
        alt={name}
        width={891}
        height={306}
        className='w-full'
      />
      <div className='bg-white p-5'>
        <h1 className='text-base font-bold text-[#242760]'>{subject}</h1>
        <h1 className='text-xl font-normal text-[#050838]'>{name}</h1>
        <p className='text-base font-light text-[#A0A0A0]'>{description}</p>
      </div>
    </div>
  );
}
