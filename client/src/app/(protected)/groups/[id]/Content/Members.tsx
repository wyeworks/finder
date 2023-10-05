'use client';

import Input from '@/components/common/Input';
import MemberCard from './MemberCard';
import FilterIcon from '@/assets/Icons/FilterIcon';
import { useState } from 'react';
import strings from '@/locales/strings.json';
import { removeAccents } from '@/utils/Formatter';

export type Member = {
  name: string;
  email: string;
  role: 'Miembro' | 'Administrador';
};

type MembersProps = {
  members: Member[];
};

export default function Members({ members }: MembersProps) {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (event: any) => {
    setFilterText(event.target.value);
  };

  const filteredUsers = members.filter((user) =>
    removeAccents(user.name.toLowerCase()).includes(
      removeAccents(filterText.toLowerCase())
    )
  );

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
        {filteredUsers.map((user, index) => (
          <div key={index}>
            <MemberCard member={user} renderRightSection='Tags' />
          </div>
        ))}
      </div>
    </div>
  );
}
