'use client';

import Input from '@/components/common/Input';
import MemberCard from './MemberCard';
import FilterIcon from '@/assets/Icons/FilterIcon';
import { useCallback, useEffect, useState } from 'react';
import strings from '@/locales/strings.json';
import { removeAccents } from '@/utils/Formatter';
import Button from '@/components/common/Button';
import OutIcon from '@/assets/Icons/OutIcon';
import { usePathname, useRouter } from 'next/navigation';
import { Member } from '@/types/Member';
import { GroupService } from '@/services/GroupService';
import { useSession } from 'next-auth/react';
import Alert from '@/components/common/Alert';

export default function Members() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const groupId = pathname.split('/')[2];
  const [filterText, setFilterText] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [member, setMember] = useState<Member>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const fetchData = useCallback(async () => {
    const getMembers = await GroupService.getGroupMembers(
      groupId,
      session?.user.accessToken!
    );
    // check if I am a member
    const currentMember = getMembers.find(
      (member) => member.id == session?.user.id
    );
    currentMember && setMember(currentMember);
    // look if I am an admin
    setIsAdmin(!!(currentMember && currentMember.role === 'admin'));
    setMember(currentMember);
    setMembers(getMembers);
  }, [groupId, session?.user.accessToken, session?.user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (event: any) => {
    setFilterText(event.target.value);
  };

  const filteredUsers = members.filter((user: any) =>
    removeAccents(user.name.toLowerCase()).includes(
      removeAccents(filterText.toLowerCase())
    )
  );

  const exitGroup = async () => {
    setAlertMessage('');
    setIsVisible(false);
    try {
      await GroupService.exitGroup(
        member?.member_id!,
        session?.user.accessToken!
      );
      router.push('/groups');
    } catch (error) {
      setAlertMessage(strings.common.error.unexpectedError);
      setIsVisible(true);
    }
  };

  if (members.length === 0) {
    return <></>;
  }

  return (
    <div
      className='mb-10 grid grid-rows-[60px,auto]'
      data-testid='members-component'
    >
      <div className='max-w-[100%] border border-solid border-gray-200 bg-white sm:max-w-none'>
        <Input
          id='filter-input-members'
          name='filter-input-members'
          type='text'
          placeholder='Filtrar Miembros'
          Icon={<FilterIcon className='h-5 w-5' />}
          maxWidth={false}
          classNameWrapper='m-3'
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <div className='max-h-72 overflow-auto border-b border-solid border-gray-200 bg-white'>
        {filteredUsers.length === 0 && (
          <div className='border-x border-solid p-10 text-center'>
            {strings.groups.membersTab.emptyMessage}
          </div>
        )}
        {filteredUsers.map((user: any, index: number) => (
          <div key={index}>
            <MemberCard
              member={user}
              type='Tags'
              isAdmin={isAdmin}
              fetchData={fetchData}
            />
          </div>
        ))}
      </div>
      {member && (
        <>
          <Button
            type='button'
            text={'Salir del grupo'}
            id='leave-group-button'
            classNameWrapper='mt-4 w-fit sm:ml-[40%] ml-[33%]'
            className='justify-self-center !border !border-solid !border-gray-200 !bg-gray-50 !text-leaveRed hover:!bg-gray-100'
            Icon={<OutIcon className='mr-2 h-6 w-6 text-leaveRed' />}
            onClick={exitGroup}
          />
          <Alert
            isVisible={isVisible}
            message={alertMessage}
            title={strings.common.error.exitGroup}
            alertType='error'
          />
        </>
      )}
    </div>
  );
}
