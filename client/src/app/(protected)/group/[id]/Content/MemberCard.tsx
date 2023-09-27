import EllipsisVerticalIcon from '@/assets/Icons/EllipsisVerticalIcon';
import Image from 'next/image';
import defaultUser from '@/assets/images/default_user.png';
import Tag from '@/components/common/Tag';
import { Member } from './Members';

type MemberCardProp = {
  member: Member;
};

export default function MemberCard({ member }: MemberCardProp) {
  const { name, email, role } = member;
  return (
    <div
      className='grid w-full max-w-[100%] grid-cols-[40px,auto,auto,20px] items-center 
        border border-solid border-gray-200 p-2 hover:bg-gray-100 sm:max-w-none sm:grid-cols-[10%,65%,20%,5%]'
    >
      <div className='p-3'>
        <Image
          alt='Avatar'
          src={defaultUser}
          className='rounded-full bg-slate-400 shadow-sm'
          width={30}
          height={30}
        />
      </div>
      <div className='flex flex-col overflow-auto'>
        <span className=' font-bold'>{name}</span>
        <span>{email}</span>
      </div>
      <div className={`${role === 'Miembro' ? 'sm:pl-5' : 'sm:pl-2'}`}>
        <Tag type={role} />
      </div>
      <div>
        <EllipsisVerticalIcon className='h-6 w-6' />
      </div>
    </div>
  );
}
