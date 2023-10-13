'use client';

import React from 'react';
import SearchDropdown from '@/components/common/SearchDropDown';
import { TimeOfDay } from '@/types/StudyGroup';
import { Subject } from '@/types/Subject';
import { parseSubjectToOption, translatePreference } from '@/utils/Formatter';

type MobileFiltersProps = {
  subjects: Subject[];
  isOpen: boolean;
  onClose: () => void;
};

function isTimeOfDay(key: string): key is keyof typeof TimeOfDay {
  return key in TimeOfDay;
}

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
        {/* Close button */}
        <div className='flex justify-between bg-gray-200 px-4 py-2'>
          <h4 className='font-bold'>Filtros</h4>
          <button onClick={onClose}>&gt;</button>
        </div>
        {/* Subject Filter */}
        <div className='mt-4 px-4'>
          <h4 className='font-bold'>Materia</h4>
          <SearchDropdown
            id='dropdown'
            options={parseSubjectToOption(subjects)}
            required={true}
            placeholder=''
          />
        </div>
        {/* Time Preference Filter */}
        <div>
          <h4 className='mt-4 px-4 font-bold'>Preferencia Horaria</h4>
          {['Morning', 'Afternoon', 'Night'].map((time) => {
            if (isTimeOfDay(time)) {
              return (
                <div key={time} className='px-4'>
                  <label>
                    <input
                      type='checkbox'
                      name='time_preference'
                      value={time.toLowerCase()}
                      className='mr-2'
                    />
                    {translatePreference(TimeOfDay[time])}
                  </label>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
