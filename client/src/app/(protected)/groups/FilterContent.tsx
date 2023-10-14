import React from 'react';
import SearchDropdown from '@/components/common/SearchDropDown';
import { TimeOfDay } from '@/types/StudyGroup';
import { Subject } from '@/types/Subject';
import { parseSubjectToOption, translatePreference } from '@/utils/Formatter';

type FiltersContentProps = {
  subjects: Subject[];
};

function isTimeOfDay(key: string): key is keyof typeof TimeOfDay {
  return key in TimeOfDay;
}

export const FiltersContent: React.FC<FiltersContentProps> = ({ subjects }) => {
  return (
    <div className='flex flex-col'>
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
  );
};
