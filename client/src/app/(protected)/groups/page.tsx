import React from 'react';
import { GroupService } from '@/services/GroupService';
import { SubjectService } from '@/services/SubjectService';
import View from './View';

export default async function Groups() {
  const groups = await GroupService.getGroups();
  const subjects = await SubjectService.getAll();

  return (
    <div className='flex flex-col'>
      <div className='p-5 text-[#2B2D54] lg:border-b-2 lg:bg-[#2B2D54] lg:text-white'>
        <h1 className='text-center text-4xl font-extrabold'>
          Resultados de la búsqueda
        </h1>
      </div>
      <View groups={groups} subjects={subjects} />
    </div>
  );
}
