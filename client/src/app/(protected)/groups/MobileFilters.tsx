import React from 'react';
import { Subject } from '@/types/Subject';
import { FiltersContent } from './FilterContent';
import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon';

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
        <div className='flex items-center justify-between bg-gray-200 px-4 py-2'>
          <h1 className='text-3xl font-bold'>Filtros</h1>
          <a
            onClick={onClose}
            className='block shrink-0 rounded-lg p-2.5 text-iconTextHeader hover:text-gray-800'
          >
            <ArrowLeftIcon className='h-8 w-8 ' />
          </a>
        </div>
        <FiltersContent subjects={subjects} />
      </div>
    </div>
  );
}
