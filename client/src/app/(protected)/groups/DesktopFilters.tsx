'use client';

import React from 'react';
import { Subject } from '@/types/Subject';
import { FiltersContent } from './FilterContent';

type DesktopFiltersProps = {
  subjects: Subject[];
};

export default function DesktopFilters({ subjects }: DesktopFiltersProps) {
  return (
    <div className='flex h-full flex-col shadow-md'>
      <div className='bg-gray-200'>
        <h4 className='px-4 py-2 font-bold'>Filtros</h4>
      </div>
      <FiltersContent subjects={subjects} />
    </div>
  );
}
