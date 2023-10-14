import EllipsisVerticalIcon from '@/assets/Icons/EllipsisVerticalIcon';
import Image from 'next/image';
import defaultUser from '@/assets/images/default_user.png';
import Tag from '@/components/common/Tag';
import { Member } from '@/types/Member';
import Button from '@/components/common/Button';
import UserPlusIcon from '@/assets/Icons/UserPlusIcon';
import TrashIcon from '@/assets/Icons/TrashIcon';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Logger } from '@/services/Logger';
import { BackendError } from '@/types/BackendError';

type MemberCardProp = {
  member: Member;
  type: 'Buttons' | 'Tags';
  fetchData?: () => void;
  // eslint-disable-next-line no-unused-vars
  onError?: (error: string[]) => void;
};

function mapRole(backEndRole: string) {
  if (backEndRole === 'admin') return 'Administrador';
  return 'Miembro';
}

export default function MemberCard({
  member,
  type,
  fetchData,
  onError,
}: MemberCardProp) {
  const {
    name,
    email,
    role = '',
    group_id = '',
    user_email,
    user_name,
    id = '',
  } = member;

  async function handleJoin(status: 'accepted' | 'rejected') {
    let reason = '';
    if (status === 'rejected') reason = 'admin rejected user';
    try {
      const response = await ApiCommunicator.clientSideHandleRequestGroup({
        groupId: group_id,
        requestId: id,
        status: status,
        reason: reason,
      });
      if (!response.ok) {
        const error = (await response.json()) as BackendError;
        if (onError) onError(error.errors.group ?? ['Error inesperado']);
        return;
      }
      if (fetchData) fetchData();
    } catch (error) {
      Logger.debug('Error trying accepted or rejected user' + { error });
    }
  }

  return (
    <div
      className='grid w-full max-w-[100%] grid-cols-[40px,160px,auto] items-center 
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
          {name ? name : user_name}
        </span>
        <span className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
          {email ? email : user_email}
        </span>
      </div>
      {type === 'Tags' && (
        <div className='grid grid-cols-[auto,20px]'>
          <div className='justify-self-center'>
            <Tag type={mapRole(role)} />
          </div>
          <div>
            <EllipsisVerticalIcon className='h-6 w-6' />
          </div>
        </div>
      )}
      {type === 'Buttons' && (
        <div className='grid grid-rows-[30px,30px] gap-3 sm:grid-cols-[100px,100px] sm:grid-rows-none sm:gap-6'>
          <Button
            text='Aceptar'
            type='button'
            Icon={
              <UserPlusIcon className='mr-2 h-5 w-5 shrink-0 text-green-600' />
            }
            classNameWrapper='h-4'
            className='h-8 items-center border-[1.5px]  border-green-600 !bg-transparent !font-medium !text-green-600 hover:!bg-gray-200 sm:m-3'
            onClick={() => handleJoin('accepted')}
          />
          <Button
            text='Rechazar'
            type='button'
            Icon={<TrashIcon className='mr-1 h-5 w-5 shrink-0 text-red-600' />}
            className=' h-8 items-center border-[1.5px]  border-red-600 !bg-transparent !font-medium !text-red-600 hover:!bg-gray-200 sm:m-3'
            onClick={() => handleJoin('rejected')}
          />
        </div>
      )}
    </div>
  );
}
