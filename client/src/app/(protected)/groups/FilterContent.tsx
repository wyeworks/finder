import React from 'react';
import SearchDropdown from '@/components/common/SearchDropDown';
import { TimeOfDay } from '@/types/StudyGroup';
import { Subject } from '@/types/Subject';
import { parseSubjectToOption, translatePreference } from '@/utils/Formatter';
import Link from 'next/link';

type FiltersContentProps = {
  subjects: Subject[];
};

function isTimeOfDay(key: string): key is keyof typeof TimeOfDay {
  return key in TimeOfDay;
}

export const FiltersContent: React.FC<FiltersContentProps> = ({ subjects }) => {
  return (
    <div className='flex h-full flex-col'>
      <div className='mt-4 px-4'>
        <h4 className='font-bold'>Materia</h4>
        <SearchDropdown
          id='dropdown'
          options={parseSubjectToOption(subjects)}
          required={true}
          placeholder=''
        />
      </div>
      <div className='px-4 pt-4'>
        <label className='font-bold'>
          <input
            type='checkbox'
            name='my_groups'
            className='mr-2 accent-primaryBlue'
          />
          Mis grupos
        </label>
      </div>
      <div>
        <h4 className='mt-4 px-4 font-bold'>Preferencia horaria</h4>
        {['Morning', 'Afternoon', 'Night'].map((time) => {
          if (isTimeOfDay(time)) {
            return (
              <div key={time} className='px-4'>
                <label>
                  <input
                    type='checkbox'
                    name='time_preference'
                    value={time.toLowerCase()}
                    className='mr-2 accent-primaryBlue'
                  />
                  {translatePreference(TimeOfDay[time])}
                </label>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className='flex justify-center pt-3'>
        <Link
          href='/groups/new'
          className='rounded-md bg-primaryBlue p-3 text-white'
        >
          Crear grupo
        </Link>
      </div>
    </div>
  );
};
