import { StudyGroup } from '@/types/StudyGroup';
import Image from 'next/image';
import React from 'react';

type GroupCardProps = {
  group: StudyGroup;
};

function GroupCard({ group }: GroupCardProps) {
  return (
    <div
      data-testid={`groupCard-${group.name}`}
      className='m-10 flex w-[444px] flex-col overflow-hidden rounded-2xl shadow-2xl'
    >
      <Image
        data-testid={`groupBanner-${group.banner ?? 'default'}`}
        src={group.banner ? group.banner : '/default_group_banner.png'}
        alt={group.name}
        width={891}
        height={306}
        className='w-full'
      />
      <div className='bg-white p-5'>
        <h1
          data-testid={`groupSubject-${group.subject}`}
          className='text-base font-bold text-[#242760]'
        >
          {group.subject}
        </h1>
        <h1
          data-testid={`groupName-${group.name}`}
          className='text-xl font-normal text-[#050838]'
        >
          {group.name}
        </h1>
        <p
          data-testid={`groupDescription-${group.description}`}
          className='text-base font-light text-[#A0A0A0]'
        >
          {group.description}
        </p>
      </div>
    </div>
  );
}

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
    <div className='overflow-hidden border-[#E7E7E7] bg-[#F3F4F6] lg:m-20 lg:rounded-2xl lg:border-2 lg:bg-white'>
      <div className='p-5 text-[#2B2D54] lg:border-b-2 lg:bg-[#2B2D54] lg:text-white'>
        <h1 className='text-4xl font-extrabold'>Grupos</h1>
      </div>
      {groups.length !== 0 ? (
        <SubscribedGroups>
          {groups.map((group) => (
            <GroupCard key={group.name} group={group} />
          ))}
        </SubscribedGroups>
      ) : (
        <EmptyGroups />
      )}
    </div>
  );
}
