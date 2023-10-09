import { GroupCard } from '@/components/common/GroupCard';
import { StudyGroup } from '@/types/StudyGroup';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { GroupService } from '@/services/GroupService';
import { User } from '@/types/User';
import Loading from '@/components/common/Loading';
import { Subject } from '@/types/Subject';
import { SubjectService } from '@/services/SubjectService';

type GroupCardProps = {
  group: StudyGroup;
  subject: Subject;
};

function GroupCard({ group, subject }: GroupCardProps) {
  return (
    <div
      data-testid={`groupCard-${group.name}`}
      className='m-5 flex flex-col overflow-hidden rounded-2xl shadow-2xl lg:w-[444px]'
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
    <div data-testid='subscribedGroups' className='grid-cols-2 lg:grid'>
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

export function Groups({ groups }: { groups: GroupCardProps[] }) {
  return (
    <>
      {groups.length !== 0 ? (
        <SubscribedGroups>
          {groups.map((props) => (
            <GroupCard
              key={props.group.name}
              group={props.group}
              subject={props.subject}
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
    </>
  );
}

async function GroupGrid({ user }: GroupsLayoutProps) {
  const groups = await GroupService.getActiveGroups(user);
  const subjects = groups.map((group) =>
    SubjectService.getSubject(group.subject_id)
  );
  const subjectsResolved = await Promise.all(subjects);
  const groupsWithSubjects = groups.map((group, index) => ({
    group,
    subject: subjectsResolved[index],
  }));

  return <Groups groups={groupsWithSubjects} />;
}

export default function GroupsLayout({ user }: GroupsLayoutProps) {
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
