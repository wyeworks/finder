import React, { Suspense } from 'react';
import { User } from '@/types/User';
import Loading from '@/components/common/Loading';
import { GroupCard } from '@/components/common/GroupCard';
import { StudyGroup } from '@/types/StudyGroup';
import Empty from '@/components/common/Empty';

type GroupsLayoutProps = {
  user: User;
};

export function Groups({ groups }: { groups: StudyGroup[] }) {
  return (
    <div className='flex items-center justify-center'>
      {groups.length !== 0 ? (
        <div
          data-testid='subscribedGroups'
          className='grid h-full w-full content-center gap-4 overflow-auto p-5 lg:grid-flow-col lg:pl-10'
        >
          {groups.map((props) => (
            <GroupCard
              key={props.name}
              group={props}
              className='h-full w-full max-w-[350px]'
            />
          ))}
        </div>
      ) : (
        <Empty text='No se encontraron grupos' />
      )}
    </div>
  );
}

export default function GroupsLayout({ user }: GroupsLayoutProps) {
  return (
    <div className='w-full overflow-hidden border-[#E7E7E7] bg-[#F3F4F6] lg:w-1/2 lg:rounded-2xl lg:border-2 lg:bg-white'>
      <div className='p-5 text-[#2B2D54] lg:border-b-2 lg:bg-[#2B2D54] lg:text-white'>
        <h1 className='text-4xl font-extrabold'>Grupos</h1>
      </div>
      <Suspense fallback={<Loading />}>
        <Groups groups={user.groups!} />
      </Suspense>
    </div>
  );
}
