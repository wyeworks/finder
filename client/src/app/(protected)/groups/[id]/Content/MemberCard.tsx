'use client';

import EllipsisVerticalIcon from '@/assets/Icons/EllipsisVerticalIcon';
import { Fragment } from 'react';
import Image from 'next/image';
import defaultUser from '@/assets/images/default_user.png';
import Tag from '@/components/common/Tag';
import { Member } from '@/types/Member';
import Button from '@/components/common/Button';
import UserPlusIcon from '@/assets/Icons/UserPlusIcon';
import TrashIcon from '@/assets/Icons/TrashIcon';
import { Logger } from '@/services/Logger';
import { BackendError } from '@/types/BackendError';
import { GroupService } from '@/services/GroupService';
import { useSession } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';

type MemberCardProp = {
  member: Member;
  type: 'Buttons' | 'Tags';
  fetchData?: () => void;
  // eslint-disable-next-line no-unused-vars
  onError?: (error: string[]) => void;
  isAdmin?: boolean;
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
  isAdmin = false,
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

  const { data: session } = useSession();

  async function handleJoin(status: 'accepted' | 'rejected') {
    let reason = '';
    if (status === 'rejected') reason = 'admin rejected user';
    try {
      const response = await GroupService.handleRequestGroup(
        {
          groupId: group_id,
          requestId: id,
          status: status,
          reason: reason,
        },
        session?.user.accessToken!,
        {
          handleNotOk: false,
          asJSON: false,
        }
      );
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

  const showTagOptions = function (memberId: string) {
    if (isAdmin && memberId !== session?.user.id) return true;
    return false;
  };

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
            {showTagOptions(id) && (
              <Menu as='div' className='z-10'>
                <div>
                  <Menu.Button className='relative z-0 flex max-w-xs rounded-full bg-transparent text-sm'>
                    <EllipsisVerticalIcon className='h-6 w-6' />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <div className='absolute z-20'>
                    <div className='z-20 float-left'>
                      <Menu.Items className='fixed right-0 z-20 mt-2 block w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:right-auto'>
                        {role === 'participant' && (
                          <Menu.Item>
                            <button className='group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900'>
                              Designar como{' '}
                              {role === 'participant'
                                ? 'administrador'
                                : 'miembro'}
                            </button>
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          <button
                            className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-[#DC3545]`}
                          >
                            Eliminar del grupo
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </div>
                  </div>
                </Transition>
              </Menu>
            )}
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
