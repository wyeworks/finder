'use client';

import SearchDropdown from '@/components/common/SearchDropDown';
import { TimeOfDay } from '@/types/StudyGroup';
import { Subject } from '@/types/Subject';
import { parseSubjectToOption, translatePreference } from '@/utils/Formatter';

type FilterBarProps = {
  subjects: Subject[];
};

export default function FilterBar({ subjects }: FilterBarProps) {
  return (
    <div className='flex h-full flex-col shadow-md'>
      <div className='bg-gray-200'>
        <h4 className='px-4 py-2 font-bold'>Filtros</h4>
      </div>
      <div className='mt-4 px-4'>
        <h4 className='font-bold'>Materia</h4>
        <SearchDropdown
          id='dropdown'
          options={parseSubjectToOption(subjects)}
          required={true}
          placeholder=''
        />
      </div>
      <div>
        <h4 className='mt-4 px-4 font-bold'>Preferencia Horaria</h4>
        <div className='px-4'>
          <label>
            <input
              type='checkbox'
              name='time_preference'
              value='manana'
              className='mr-2'
            />
            {translatePreference(TimeOfDay.Morning)}
          </label>
        </div>
        <div className='px-4'>
          <label>
            <input
              type='checkbox'
              name='time_preference'
              value='tarde'
              className='mr-2'
            />
            {translatePreference(TimeOfDay.Afternoon)}
          </label>
        </div>
        <div className='px-4'>
          <label>
            <input
              type='checkbox'
              name='time_preference'
              value='noche'
              className='mr-2'
            />
            {translatePreference(TimeOfDay.Night)}
          </label>
        </div>
      </div>
    </div>
  );
}
