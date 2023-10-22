import Image from 'next/image';
import React, { Suspense } from 'react';
import { User } from '@/types/User';
import Loading from '@/components/common/Loading';
import Link from 'next/link';

type GroupCardProps = {
  id: number;
  name: string;
  description: string;
  subject: string;
  banner?: string;
};

function GroupCard({ id, name, description, subject, banner }: GroupCardProps) {
  return (
    <Link href={`/groups/${id}`}>
      <div
        data-testid={`groupCard-${name}`}
        className='m-5 flex flex-col overflow-hidden rounded-2xl shadow-2xl lg:w-[444px]'
      >
        <Image
          data-testid={`groupBanner-${banner ?? 'default'}`}
          src={banner ? banner : '/default_group_banner.png'}
          alt={name}
          width={891}
          height={306}
          className='w-full'
        />
        <div className='bg-white p-5'>
          <h1
            data-testid={`groupSubject-${subject}`}
            className='text-base font-bold text-[#242760]'
          >
            {subject}
          </h1>
          <h1
            data-testid={`groupName-${name}`}
            className='text-xl font-normal text-[#050838]'
          >
            {name}
          </h1>
          <p
            data-testid={`groupDescription-${description}`}
            className='text-base font-light text-[#A0A0A0]'
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
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
            <GroupCard key={props.name} {...props} />
          ))}
        </SubscribedGroups>
      ) : (
        <EmptyGroups />
      )}
    </>
  );
}

export default function GroupsLayout({ user }: GroupsLayoutProps) {
  return (
    <div className='overflow-hidden border-[#E7E7E7] bg-[#F3F4F6] lg:rounded-2xl lg:border-2 lg:bg-white'>
      <div className='p-5 text-[#2B2D54] lg:border-b-2 lg:bg-[#2B2D54] lg:text-white'>
        <h1 className='text-4xl font-extrabold'>Grupos</h1>
      </div>
      <Suspense fallback={<Loading />}>
        <Groups groups={user.groups!} />
      </Suspense>
    </div>
  );
}
