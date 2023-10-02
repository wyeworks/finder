'use client';

import FilterIcon from '@/assets/Icons/FilterIcon';
import Input from '@/components/common/Input';
import MemberCard from './MemberCard';
import { useState } from 'react';
import { Member } from './Members';
import strings from '@/locales/strings.json';

type RequestJoinGroupProps = {
  requestUsers: Member[];
};

export default function RequestJoinGroup({
  requestUsers,
}: RequestJoinGroupProps) {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (event: any) => {
    setFilterText(event.target.value);
  };

  const filteredUsers = requestUsers.filter((user) =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

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
            <MemberCard member={user} renderRightSection='Buttons' />
          </div>
        ))}
      </div>
    </div>
  );
}
