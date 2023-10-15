import React from 'react';
import { GroupService } from '@/services/GroupService';
import { SubjectService } from '@/services/SubjectService';
import View from './View';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export default async function Groups() {
  revalidatePath('/');
  const session = await getServerSession(authOptions);
  const groups = await GroupService.getAll(session?.user.accessToken!);
  const subjects = await SubjectService.getAll(session?.user.accessToken!);

  return (
    <div className='flex flex-col'>
      <div className='p-5 text-[#2B2D54] lg:border-b-2 lg:bg-primaryBlue lg:text-white'>
        <h1 className='text-center text-4xl font-extrabold'>
          Resultados de la búsqueda
        </h1>
      </div>
      <View groups={groups} subjects={subjects} />
    </div>
  );
}
