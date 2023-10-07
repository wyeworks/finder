'use client';

import FilterIcon from '@/assets/Icons/FilterIcon';
import Input from '@/components/common/Input';
import MemberCard from './MemberCard';
import { useEffect, useState } from 'react';
import { Member } from '@/types/Member';
import strings from '@/locales/strings.json';
import { usePathname } from 'next/navigation';
// import { GroupService } from '@/services/GroupService';
// import { removeAccents } from '@/utils/Formatter';
import { BackendError } from '@/types/BackendError';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Logger } from '@/services/Logger';

export default function RequestJoinGroup() {
  const pathname = usePathname();
  const groupId = pathname.split('/')[2];
  const [filterText, setFilterText] = useState('');
  const [requestUsers, setRequestMembers] = useState<Member[]>([]);
  const [showRequest, setShowRequest] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request: any =
          await ApiCommunicator.clientSideRequestJoinGroup(groupId);
        const data = await request.json();
        if (!request.ok) {
          const parsedError = data as BackendError;
          if (parsedError.errors.group) setShowRequest(false);
          return;
        }
        setShowRequest(true);
        setRequestMembers(data);
      } catch (error) {
        Logger.error('Error trying to get request to join group: ' + { error });
      }
    };
    fetchData();
  }, [groupId]);

  const handleFilterChange = (event: any) => {
    setFilterText(event.target.value);
  };

  if (requestUsers.length === 0) {
    return <></>;
  }

  if (!showRequest) {
    return (
      <div className='border border-solid p-10 text-center'>
        Debe ser administrador del grupo para ver las solicitudes
      </div>
    );
  }

  const filteredUsers = requestUsers;
  // filter((user) =>
  //     user.name?.toLowerCase()?.includes(
  //       removeAccents(filterText.toLowerCase())
  //     )
  // );

  return (
    <div
      className='grid grid-rows-[60px,auto]'
      data-testid='request-join-group-component'
    >
      <div className='max-w-[100%] border border-solid border-gray-200 sm:max-w-none'>
        <Input
          id='filter-input-request'
          name='filter-input-request'
          type='text'
          placeholder='Filtrar Solicitudes'
          Icon={<FilterIcon className='h-5 w-5' />}
          maxWidth={false}
          classNameWrapper='m-3'
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <div className='max-h-72 overflow-auto border-b border-solid border-gray-200'>
        {filteredUsers.length === 0 && (
          <div className='border-x border-solid p-10 text-center'>
            {strings.groups.requestTab.emptyMessage}
          </div>
        )}
        {filteredUsers.map((user, index) => (
          <div key={index}>
            <MemberCard member={user} type='Buttons' />
          </div>
        ))}
      </div>
    </div>
  );
}
