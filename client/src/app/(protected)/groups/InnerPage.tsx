import React, { useEffect, useState } from 'react';
import { GroupCard } from '@/components/common/GroupCard';
import { StudyGroup } from '@/types/StudyGroup';
import MobileFilters from './MobileFilters';
import { Subject } from '@/types/Subject';
import Pagination from './Pagination';
import FilterIcon from '@/assets/Icons/FilterIcon';
import DesktopFilters from './DesktopFilters';
import { SearchGroup } from '@/app/(protected)/groups/page';

type ViewProps = {
  groups: StudyGroup[];
  subjects: Subject[];
  // eslint-disable-next-line no-unused-vars
  onSearchParametersChange: (searchGroup: SearchGroup) => void;
  searchParameters: SearchGroup;
};

export default function InnerPage({
  groups,
  subjects,
  onSearchParametersChange,
  searchParameters,
}: ViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [displayGroups, setDisplayGroups] = useState<StudyGroup[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setDisplayGroups(groups.slice(startIdx, endIdx));
  }, [groups, currentPage]);

  const totalPages = Math.ceil(groups.length / itemsPerPage);

  return (
    <div className='mx-auto flex max-w-screen-xl flex-grow flex-row'>
      {/* Mobile Filters (Visible only on mobile) */}
      <div className='md:hidden'>
        <MobileFilters
          subjects={subjects}
          isOpen={isMobileFiltersOpen}
          onSearchParametersChange={onSearchParametersChange}
          searchParameters={searchParameters}
          onClose={() => setIsMobileFiltersOpen(false)}
        />
      </div>

      {/* Desktop Filter Bar */}
      <div className='hidden w-1/3 md:block'>
        <DesktopFilters
          subjects={subjects}
          onSearchParametersChange={onSearchParametersChange}
          searchParameters={searchParameters}
        />
      </div>

      <div className='flex-grow'>
        {/* Button to toggle MobileFilters (Visible only on mobile) */}
        <div className='px-4 py-2 md:hidden'>
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className='flex w-full items-center justify-center border-b border-t bg-white px-4 py-4'
          >
            {' '}
            {/* Added border-t and border-b */}
            <FilterIcon className='mr-2 h-5 w-5' />
            Filtros
          </button>
        </div>

        <div className='flex w-full items-center justify-center'>
          <ul className='grid w-full grid-cols-1 gap-4 overflow-auto px-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {displayGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                className='h-full w-full max-w-[444px]'
              />
            ))}
          </ul>
        </div>
        <div className='mb-4 flex justify-center'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
