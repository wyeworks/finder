'use client';

import FilterIcon from '@/assets/Icons/FilterIcon';
import Input from '@/components/common/Input';
import MemberCard from './MemberCard';
import React, { useCallback, useEffect, useState } from 'react';
import { Member } from '@/types/Member';
import strings from '@/locales/strings.json';
import { usePathname } from 'next/navigation';
import { removeAccents } from '@/utils/Formatter';
import { Logger } from '@/services/Logger';
import Alert, { alertTypes } from '@/components/common/Alert';
import { GroupService } from '@/services/GroupService';
import { useSession } from 'next-auth/react';
import { NotOkError } from '@/types/NotOkError';
import { StudyGroup } from '@/types/StudyGroup';

type RequestJoinGroupProps = {
  group: StudyGroup;
};

export default function RequestJoinGroup({ group }: RequestJoinGroupProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const groupId = pathname.split('/')[2];
  const [filterText, setFilterText] = useState('');
  const [requestUsers, setRequestMembers] = useState<Member[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<alertTypes>('success');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const isAdmin =
    session?.user.id && group.admin_ids?.includes(Number(session?.user.id));

  function onError(error: string[]) {
    setIsAlertVisible(true);
    setAlertMessage(error.join(', '));
    setAlertType('error');
  }

  const fetchData = useCallback(async () => {
    setIsAlertVisible(false);
    try {
      const members = await GroupService.getRequestJoinGroup(
        groupId,
        session?.user.accessToken!
      );
      setIsLoadingData(false);
      setRequestMembers(members);
    } catch (error) {
      if (error instanceof NotOkError) {
        setIsLoadingData(false);
        return;
      }

      Logger.error('Error trying to get request to join group: ' + { error });
    }
  }, [groupId, session?.user.accessToken]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [fetchData, isAdmin]);

  const handleFilterChange = (event: any) => {
    setFilterText(event.target.value);
  };

  const filteredUsers = requestUsers.filter((user: any) =>
    removeAccents(user.user_name.toLowerCase()).includes(
      removeAccents(filterText.toLowerCase())
    )
  );

  if (!isAdmin) {
    return (
      <div className='border border-solid bg-white p-10 text-center'>
        Solo los administradores del grupo pueden ver las solicitudes
      </div>
    );
  }

  if (isLoadingData) {
    return <></>;
  }

  if (requestUsers.length === 0) {
    return (
      <div className='border border-solid bg-white p-10 text-center'>
        No hay solicitudes
      </div>
    );
  }

  return (
    <div
      className='grid grid-rows-[60px,auto]'
      data-testid='request-join-group-component'
    >
      <div className='max-w-[100%] border border-solid border-gray-200 bg-white sm:max-w-none'>
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
            <MemberCard
              member={user}
              type='Buttons'
              fetchData={fetchData}
              onError={onError}
            />
          </div>
        ))}
        <div className='mb-3'>
          <Alert
            isVisible={isAlertVisible}
            message={alertMessage}
            alertType={alertType}
            withTitle={false}
          />
        </div>
      </div>
    </div>
  );
}
