'use client';

import React from 'react';
import { Subject } from '@/types/Subject';
import { FiltersContent } from './FilterContent';

type MobileFiltersProps = {
  subjects: Subject[];
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileFilters({
  subjects,
  isOpen,
  onClose,
}: MobileFiltersProps) {
  const styles = isOpen
    ? 'transform translate-x-0'
    : 'transform -translate-x-full';

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-full w-full bg-white transition-transform duration-300 ${styles}`}
    >
      <div className='flex h-full flex-col shadow-md'>
        <div className='flex justify-between bg-gray-200 px-4 py-2'>
          <h4 className='font-bold'>Filtros</h4>
          <button onClick={onClose}>&gt;</button>
        </div>
        <FiltersContent subjects={subjects} />
      </div>
    </div>
  );
}
