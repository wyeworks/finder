'use client';

import FilterIcon from '@/assets/Icons/FilterIcon';
import Input from '@/components/common/Input';
import MemberCard from './MemberCard';
import { exampleUsers } from './Members';
import { useState } from 'react';

export default function RequestJoinGroup() {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (event: any) => {
    setFilterText(event.target.value);
  };

  const filteredUsers = exampleUsers.filter((user) =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className='grid grid-rows-[40px,60px,auto]'>
      <h2 className='p-2 text-lg font-bold'>Solicitudes</h2>
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
        {filteredUsers.map((user, index) => (
          <div key={index}>
            <MemberCard member={user} renderRightSection='Buttons' />
          </div>
        ))}
      </div>
    </div>
  );
}
