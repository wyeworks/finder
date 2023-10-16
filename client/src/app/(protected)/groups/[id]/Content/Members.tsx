'use client';

import Input from '@/components/common/Input';
import MemberCard from './MemberCard';
import FilterIcon from '@/assets/Icons/FilterIcon';
import { useEffect, useState } from 'react';
import strings from '@/locales/strings.json';
import { removeAccents } from '@/utils/Formatter';
import Button from '@/components/common/Button';
import OutIcon from '@/assets/Icons/OutIcon';
import { usePathname } from 'next/navigation';
import { Member } from '@/types/Member';
import { GroupService } from '@/services/GroupService';
import { useSession } from 'next-auth/react';

export default function Members() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const groupId = pathname.split('/')[2];
  const [filterText, setFilterText] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getMembers = await GroupService.getGroupMembers(
          groupId,
          session?.user.accessToken!,
          { asJSON: false }
        );
        // look if i am an admin
        setIsAdmin(
          getMembers.findIndex(
            (member) =>
              member.role === 'admin' && member.id === session?.user.id
          ) !== -1
        );
        setMembers(getMembers);
      } catch (error) {}
    };
    fetchData();
  }, [groupId, session?.user.accessToken]);

  const handleFilterChange = (event: any) => {
    setFilterText(event.target.value);
  };

  const filteredUsers = members.filter((user: any) =>
    removeAccents(user.name.toLowerCase()).includes(
      removeAccents(filterText.toLowerCase())
    )
  );

  if (members.length === 0) {
    return <></>;
  }

  return (
    <div
      className='mb-10 grid grid-rows-[60px,auto]'
      data-testid='members-component'
    >
      <div className='max-w-[100%] border border-solid border-gray-200 sm:max-w-none'>
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
      <div className='max-h-72 overflow-auto border-b border-solid border-gray-200'>
        {filteredUsers.length === 0 && (
          <div className='border-x border-solid p-10 text-center'>
            {strings.groups.membersTab.emptyMessage}
          </div>
        )}
        {filteredUsers.map((user: any, index: number) => (
          <div key={index}>
            <MemberCard member={user} type='Tags' isAdmin={isAdmin} />
          </div>
        ))}
      </div>
      <Button
        type='button'
        text={'Salir del grupo'}
        id='leave-group-button'
        classNameWrapper='mt-4 w-fit sm:ml-[40%] ml-[33%]'
        className='justify-self-center !border !border-solid !border-gray-200 !bg-gray-50 !text-leaveRed hover:!bg-gray-100'
        Icon={<OutIcon className='mr-2 h-6 w-6 text-leaveRed' />}
      />
    </div>
  );
}
