import { Subject } from '@/types/Subject';
import React, { Suspense } from 'react';
import { SubjectService } from '@/services/SubjectService';
import { User } from '@/types/User';
import Loading from '@/components/common/Loading';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

type SubjectsLayoutProps = {
  user: User;
};

function SubjectItem({ subject }: { subject: Subject }) {
  return (
    <div className='border-b-2 p-5 last-of-type:border-b-0'>
      <p className='text-lg font-bold text-[#242760]'>
        {subject.name} <small className='text-gray-600'>({subject.code})</small>
      </p>
    </div>
  );
}

async function SubjectList({ user }: { user: User }) {
  const session = await getServerSession(authOptions);
  const subjects = await SubjectService.getByUser(
    user,
    session?.user.accessToken!
  );

  return (
    <div className='h-min'>
      {subjects.map((subject) => (
        <SubjectItem key={subject.code} subject={subject} />
      ))}
    </div>
  );
}

export default async function SubjectsLayout({ user }: SubjectsLayoutProps) {
  return (
    <div className='h-min overflow-hidden lg:ml-10 lg:rounded-2xl lg:border-2 lg:bg-white'>
      <div className='border-b-2 p-5 text-[#2B2D54] lg:bg-[#2B2D54] lg:text-white'>
        <h1 className='text-4xl font-extrabold'>Materias en curso</h1>
      </div>
      <div>
        <Suspense fallback={<Loading />}>
          <SubjectList user={user} />
        </Suspense>
      </div>
    </div>
  );
}
