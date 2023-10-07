import { StudyGroup } from '@/types/StudyGroup';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { SubjectService } from '@/services/SubjectService';
import { GroupService } from '@/services/GroupService';
import { User } from '@/types/User';
import Loading from '@/components/common/Loading';

type GroupCardProps = {
  group: StudyGroup;
};

async function GroupCard({ group }: GroupCardProps) {
  const subject = await SubjectService.getSubject(group.subject_id);
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
          data-testid={`groupSubject-${group.subject_id}`}
          className='text-base font-bold text-[#242760]'
        >
          {subject.name}
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
  user: User;
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

async function GroupGrid({ user }: GroupsLayoutProps) {
  const groups = await GroupService.getActiveGroups(user);
  return (
    <>
      {groups.length !== 0 ? (
        <SubscribedGroups>
          {groups.map((group) => (
            <GroupCard key={group.name} group={group} />
          ))}
        </SubscribedGroups>
      ) : (
        <EmptyGroups />
      )}
    </>
  );
}

export default async function GroupsLayout({ user }: GroupsLayoutProps) {
  return (
    <div className='overflow-hidden border-[#E7E7E7] bg-[#F3F4F6] lg:rounded-2xl lg:border-2 lg:bg-white'>
      <div className='p-5 text-[#2B2D54] lg:border-b-2 lg:bg-[#2B2D54] lg:text-white'>
        <h1 className='text-4xl font-extrabold'>Grupos</h1>
      </div>
      <Suspense fallback={<Loading />}>
        <GroupGrid user={user} />
      </Suspense>
    </div>
  );
}
