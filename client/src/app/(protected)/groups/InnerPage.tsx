'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { GroupCard } from '@/components/common/GroupCard';
import { StudyGroup } from '@/types/StudyGroup';
import MobileFilters from './MobileFilters';
import { Subject } from '@/types/Subject';
import Pagination from './Pagination';
import FilterIcon from '@/assets/Icons/FilterIcon';
import DesktopFilters from './DesktopFilters';
import { SearchGroup } from '@/app/(protected)/groups/page';
import Image from 'next/image';
import { GroupService } from '@/services/GroupService';
import { SubjectService } from '@/services/SubjectService';
import { useSession } from 'next-auth/react';
import EmptyBoxImage from '@/assets/images/empty_box.png';
import LoadingAsset from '@/components/common/LoadingAsset';

export default function InnerPage() {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [displayGroups, setDisplayGroups] = useState<StudyGroup[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchGroup, setSearchGroup] = useState<SearchGroup>({});

  function handleSearchGroupChange(searchGroup: SearchGroup) {
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
    //WE want to make the fetch after one second to avoid spamming the server
    const timeout = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [fetchData]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setDisplayGroups(groups.slice(startIdx, endIdx));
  }, [groups, currentPage]);

  const totalPages = Math.ceil(groups.length / itemsPerPage);

  return (
    <div className='flex h-full flex-row justify-center'>
      <div className='flex h-full md:basis-1/6'>
        {/* Mobile Filters (Visible only on mobile) */}
        <div className='md:hidden'>
          <MobileFilters
            subjects={subjects}
            isOpen={isMobileFiltersOpen}
            onSearchParametersChange={handleSearchGroupChange}
            searchParameters={searchGroup}
            onClose={() => setIsMobileFiltersOpen(false)}
          />
        </div>

        {/* Desktop Filter Bar */}
        <div className='hidden md:block'>
          <DesktopFilters
            subjects={subjects}
            onSearchParametersChange={handleSearchGroupChange}
            searchParameters={searchGroup}
          />
        </div>
      </div>
      <GroupsFound
        isLoading={isLoading}
        groups={displayGroups}
        onSetIsMobileFiltersOpen={setIsMobileFiltersOpen}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

function GroupsFound({
  isLoading,
  groups,
  onSetIsMobileFiltersOpen,
  currentPage,
  onSetCurrentPage,
  totalPages,
}: {
  isLoading: boolean;
  groups: StudyGroup[];
  // eslint-disable-next-line no-unused-vars
  onSetIsMobileFiltersOpen: (isOpen: boolean) => void;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  onSetCurrentPage: (page: number) => void;
  totalPages: number;
}) {
  const noGroupsFound = groups.length === 0 && !isLoading;

  return (
    <div className='flex basis-5/6 flex-col md:justify-start'>
      {/* Button to toggle MobileFilters (Visible only on mobile) */}
      <div className='mx-4 my-2 rounded-lg border md:hidden'>
        <button
          onClick={() => onSetIsMobileFiltersOpen(true)}
          className='flex w-full items-center justify-center bg-transparent px-4 py-4'
        >
          {/* Added border-t and border-b */}
          <FilterIcon className='mr-2 h-5 w-5' />
          Filtros
        </button>
      </div>

      <div className='flex h-full w-full flex-col md:justify-between'>
        {!isLoading && !noGroupsFound && (
          <>
            <div className='flex w-full items-center justify-center'>
              <ul className='grid w-full grid-cols-1 gap-4 overflow-auto px-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:pr-48 xl:grid-cols-4 '>
                {groups.map((group) => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    className='h-full w-full max-w-[350px]'
                  />
                ))}
              </ul>
            </div>
            <div className='mb-4 flex justify-center'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={onSetCurrentPage}
              />
            </div>
          </>
        )}
        {(isLoading || noGroupsFound) && (
          <div className='mt-8 flex flex-col items-center justify-center md:fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:transform'>
            {isLoading && <LoadingAsset message={'Cargando grupos...'} />}
            {noGroupsFound && (
              <>
                <Image src={EmptyBoxImage} alt='Caja vacia' />
                <p className='mt-4'>No se encontraron grupos</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
