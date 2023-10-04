import EllipsisVerticalIcon from '@/assets/Icons/EllipsisVerticalIcon';
import Image from 'next/image';
import defaultUser from '@/assets/images/default_user.png';
import Tag from '@/components/common/Tag';
import { Member } from './Members';
import Button from '@/components/common/Button';
import UserPlusIcon from '@/assets/Icons/UserPlusIcon';
import TrashIcon from '@/assets/Icons/TrashIcon';

type MemberCardProp = {
  member: Member;
  renderRightSection: 'Buttons' | 'Tags';
};

export default function MemberCard({
  member,
  renderRightSection,
}: MemberCardProp) {
  const { name, email, role } = member;
  return (
    <div
      className='grid w-full max-w-[100%] grid-cols-[40px,180px,auto] items-center 
        border border-solid border-gray-200 p-2 hover:bg-gray-100 sm:max-w-none sm:grid-cols-[10%,55%,35%]'
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
      <div className='mr-2 flex flex-col overflow-clip'>
        <span className='overflow-hidden overflow-ellipsis whitespace-nowrap font-bold'>
          {name}
        </span>
        <span className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
          {email}
        </span>
      </div>
      {renderRightSection === 'Tags' && (
        <div className='grid grid-cols-[auto,20px]'>
          <div className={`${role === 'Miembro' ? 'sm:pl-5' : 'sm:pl-2'}`}>
            <Tag type={role} />
          </div>
          <div>
            <EllipsisVerticalIcon className='h-6 w-6' />
          </div>
        </div>
      )}
      {renderRightSection === 'Buttons' && (
        <div className='grid grid-rows-[30px,30px] gap-3 sm:grid-cols-[100px,100px] sm:grid-rows-none sm:gap-6 '>
          <Button
            text='Aceptar'
            type='button'
            Icon={<UserPlusIcon className='mr-1 h-5 w-5' />}
            classNameWrapper='h-4'
            className='h-8 items-center !bg-[#BCEDFF] !font-light !text-black hover:!bg-blue-300 sm:m-3  '
          />
          <Button
            text='Rechazar'
            type='button'
            Icon={<TrashIcon className='h-6 w-6' />}
            className=' h-8 items-center !bg-gray-300 !font-light !text-black hover:!bg-gray-400 sm:m-3  '
          />
        </div>
      )}
    </div>
  );
}
