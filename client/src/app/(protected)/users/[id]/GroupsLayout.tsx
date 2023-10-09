import { GroupCard } from '@/components/common/GroupCard';
import { StudyGroup } from '@/types/StudyGroup';
import React from 'react';

type GroupsLayoutProps = {
  groups: StudyGroup[];
};

function SubscribedGroups({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-testid='subscribedGroups'
      className='flex flex-row flex-wrap justify-center lg:justify-start'
    >
      {children}
    </div>
  );
}

function EmptyGroups() {
  return (
    <div
      data-testid='emptyGroups'
      className='flex h-[500px] flex-col items-center justify-center'
    >
      <h1 className='text-2xl font-bold text-[#242760]'>
        No hay grupos disponibles
      </h1>
    </div>
  );
}

export default function GroupsLayout({ groups }: GroupsLayoutProps) {
  return (
    <div className='overflow-hidden border-[#E7E7E7] bg-[#F3F4F6] lg:rounded-2xl lg:border-2 lg:bg-white'>
      <div className='p-5 text-[#2B2D54] lg:border-b-2 lg:bg-[#2B2D54] lg:text-white'>
        <h1 className='text-4xl font-extrabold'>Grupos</h1>
      </div>
      {groups.length !== 0 ? (
        <SubscribedGroups>
          {groups.map((group) => (
            <GroupCard
              key={group.name}
              group={group}
              className='m-10 flex w-[444px]'
            />
          ))}
        </SubscribedGroups>
      ) : (
        <EmptyGroups />
      )}
    </div>
  );
}
