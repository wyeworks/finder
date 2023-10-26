'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { GroupService } from '@/services/GroupService';
import { SubjectService } from '@/services/SubjectService';
import Image from 'next/image';
import InnerPage from './InnerPage';
import { useSession } from 'next-auth/react';
import { StudyGroup } from '@/types/StudyGroup';
import { Subject } from '@/types/Subject';
import Button from '@/components/common/Button';
import PlusIcon from '@/assets/Icons/PlusIcon';
import Link from 'next/link';

//We can search groups by name, subject, timeOfDay, and isMyGroup
export interface SearchGroup {
  name?: string;
  subject?: number;
  timeOfDay?: string[];
  isMyGroup?: boolean;
}

export default function Groups() {
  const { data: session } = useSession();

  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchGroup, setSearchGroup] = useState<SearchGroup>({});

  function handleSearchParamsChange(searchGroup: SearchGroup) {
    setSearchGroup(searchGroup);
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const groupsFetch = await GroupService.getAll(
      session?.user.accessToken!,
      searchGroup
    );
    const subjectsFetch = await SubjectService.getAll(
      session?.user.accessToken!
    );
    setGroups(groupsFetch);
    setSubjects(subjectsFetch);
    setIsLoading(false);
  }, [searchGroup, session?.user.accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='flex h-full flex-col'>
      <div className='flex w-full justify-center bg-primaryBlue md:flex'>
        <p className='flex w-[98%] items-center justify-center border-t-2 border-gray-500 py-5 text-2xltext-white'>
        <h1 className='grow text-center text-4xl font-extrabold'>Grupos</h1>
        <Link href={'/groups/new'} className='absolute right-0 mr-5'>
          <Button
            text='Crear grupo'
            Icon={<PlusIcon className='h-5 w-5 md:mr-2' />}
              classNameWrapper='h-12 w-12 md:w-fit p-0 m-0 rounded-full md:rounded-md  overflow-hidden'
              className='h-12 w-12 items-center md:w-fit md:border-2'
            hideTextOnMobile={true}
            />
          </Link>
        </p>
      </div>
      {!isLoading && (
        <InnerPage
          groups={groups}
          subjects={subjects}
          onSearchParametersChange={handleSearchParamsChange}
          searchParameters={searchGroup!}
        />
      )}
      {isLoading && (
        <div className='flex h-full flex-col items-center justify-center'>
          <Image
            src='/loading_groups.png'
            alt='Banner'
            width={100}
            height={100}
            className='animate-bounce object-cover'
          />
          <p className='mt-4'>Cargando grupos...</p>
        </div>
      )}
    </div>
  );
}
