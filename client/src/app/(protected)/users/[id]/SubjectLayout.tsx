import { Subject } from '@/types/Subject';
import React, { Suspense } from 'react';
import { SubjectService } from '@/services/SubjectService';
import { User } from '@/types/User';
import Loading from '@/components/common/Loading';

type SubjectsLayoutProps = {
  user: User;
};

function SubjectItem({ subject }: { subject: Subject }) {
  return (
    <div className='border-b-2 p-5'>
      <h1 className='text-lg font-bold text-[#242760]'>
        {subject.code} - {subject.name}
      </h1>
      <h2 className='text-md text-[#3D405B]'>{subject.credits} créditos</h2>
    </div>
  );
}

async function SubjectList({ user }: { user: User }) {
  const subjects = await SubjectService.getByUser(user);
  return (
    <>
      {subjects.map((subject) => (
        <SubjectItem key={subject.code} subject={subject} />
      ))}
    </>
  );
}

export default async function SubjectsLayout({ user }: SubjectsLayoutProps) {
  return (
    <div className='overflow-hidden lg:ml-10 lg:w-1/4 lg:rounded-2xl lg:border-2 lg:bg-white'>
      <div className='border-b-2 p-5 text-[#2B2D54] lg:bg-[#2B2D54] lg:text-white'>
        <h1 className='text-4xl font-extrabold'>Materias</h1>
      </div>
      <div className='h-fit'>
        <Suspense fallback={<Loading />}>
          <SubjectList user={user} />
        </Suspense>
      </div>
    </div>
  );
}
