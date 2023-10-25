import React from 'react';
import { Subject } from '@/types/Subject';
import { FiltersContent } from './FilterContent';
import { SearchGroup } from '@/app/(protected)/groups/page';

type DesktopFiltersProps = {
  subjects: Subject[];
  // eslint-disable-next-line no-unused-vars
  onSearchParametersChange: (searchGroup: SearchGroup) => void;
  searchParameters: SearchGroup;
};

export default function DesktopFilters({
  subjects,
  onSearchParametersChange,
  searchParameters,
}: DesktopFiltersProps) {
  return (
    <div className='flex h-full w-full flex-col shadow-md'>
      <div className='bg-gray-200'>
        <h4 className='px-4 py-2 font-bold'>Filtros</h4>
      </div>
      <FiltersContent
        subjects={subjects}
        onSearchParametersChange={onSearchParametersChange}
        searchParameters={searchParameters}
      />
    </div>
  );
}
