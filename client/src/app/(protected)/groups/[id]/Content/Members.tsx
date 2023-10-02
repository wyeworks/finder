'use client';

import Input from '@/components/common/Input';
import MemberCard from './MemberCard';
import FilterIcon from '@/assets/Icons/FilterIcon';
import { useState } from 'react';

// Member and exampleUsers are temporary to show de ui without back end data
export type Member = {
  name: string;
  email: string;
  role: 'Miembro' | 'Administrador';
};

export const exampleUsers: Member[] = [
  {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'Miembro',
  },
  {
    name: 'María González',
    email: 'maria@example.com',
    role: 'Administrador',
  },
  {
    name: 'Luis Rodríguez',
    email: 'luis@example.com',
    role: 'Miembro',
  },
  {
    name: 'Ana López',
    email: 'ana@example.com',
    role: 'Administrador',
  },
  {
    name: 'Carlos Martínez',
    email: 'carlos@example.com',
    role: 'Miembro',
  },
  {
    name: 'Laura Sánchez',
    email: 'laura@example.com',
    role: 'Miembro',
  },
  {
    name: 'Pedro Ramirez',
    email: 'pedro@example.com',
    role: 'Miembro',
  },
  {
    name: 'Isabel Pérez',
    email: 'isabel@example.com',
    role: 'Administrador',
  },
  {
    name: 'Antonio García',
    email: 'antonio@example.com',
    role: 'Miembro',
  },
  {
    name: 'Carmen Torres',
    email: 'carmen@example.com',
    role: 'Miembro',
  },
];

export default function Members() {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (event: any) => {
    setFilterText(event.target.value);
  };

  const filteredUsers = exampleUsers.filter((user) =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className='mb-10 grid grid-rows-[40px,60px,auto]'>
      <h2 className='p-2 text-lg font-bold'>Miembros</h2>
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
        {filteredUsers.map((user, index) => (
          <div key={index}>
            <MemberCard member={user} renderRightSection='Tags' />
          </div>
        ))}
      </div>
    </div>
  );
}
