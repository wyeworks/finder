import React, { useState } from 'react';
import SearchDropdown from '@/components/common/SearchDropDown';
import { TimeOfDay } from '@/types/StudyGroup';
import { Subject } from '@/types/Subject';
import { parseSubjectToOption, translatePreference } from '@/utils/Formatter';
import Link from 'next/link';
import { SearchGroup } from '@/app/(protected)/groups/page';

type FiltersContentProps = {
  subjects: Subject[];
  // eslint-disable-next-line no-unused-vars
  onSearchParametersChange: (searchGroup: SearchGroup) => void;
  searchParameters: SearchGroup;
};

function isTimeOfDay(key: string): key is keyof typeof TimeOfDay {
  return key in TimeOfDay;
}

export function FiltersContent({
  subjects,
  onSearchParametersChange,
  searchParameters,
}: FiltersContentProps) {
  const [selectedSubject, setSelectedSubject] = useState<number | undefined>(
    searchParameters.subject
  );
  const [myGroups, setMyGroups] = React.useState<boolean | undefined>(
    searchParameters.isMyGroup
  );
  const [timePreference, setTimePreference] = React.useState<
    string[] | undefined
  >(searchParameters.timeOfDay);

  function handleSubjectChange(value: string) {
    let selectedSubject: number | undefined;
    if (value !== '') {
      selectedSubject = parseInt(value);
    }
    setSelectedSubject(selectedSubject);
    onSearchParametersChange({
      subject: selectedSubject,
      isMyGroup: myGroups,
      timeOfDay: timePreference,
    });
  }

  function handleMyGroupsChange(value: boolean | undefined) {
    setMyGroups(value);
    onSearchParametersChange({
      subject: selectedSubject,
      isMyGroup: value,
      timeOfDay: timePreference,
    });
  }

  function handleTimePreferenceChange(value: string[] | undefined) {
    setTimePreference(value);
    onSearchParametersChange({
      subject: selectedSubject,
      isMyGroup: myGroups,
      timeOfDay: value,
    });
  }

  return (
    <div className='flex h-full flex-col'>
      <div className='mt-4 px-4'>
        <h4 className='font-bold'>Materia</h4>
        <SearchDropdown
          id='dropdown'
          options={parseSubjectToOption(subjects)}
          required={true}
          placeholder=''
          initialValue={
            subjects.find((subject) => subject.id === searchParameters.subject)
              ?.name
          }
          onChange={(value) => {
            handleSubjectChange(value);
          }}
        />
      </div>
      <div className='px-4 pt-4'>
        <label className='font-bold'>
          <input
            type='checkbox'
            name='my_groups'
            className='mr-2 accent-primaryBlue'
            checked={myGroups}
            onChange={(e) => handleMyGroupsChange(e.target.checked)}
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
                    checked={timePreference?.includes(time.toLowerCase())}
                    onChange={(e) => {
                      const prevTimePreference = timePreference ?? [];

                      if (e.target.checked) {
                        handleTimePreferenceChange([
                          ...prevTimePreference,
                          e.target.value,
                        ]);
                      } else {
                        const valueShortened = prevTimePreference.filter(
                          (time) => time !== e.target.value
                        );
                        handleTimePreferenceChange(
                          valueShortened.length === 0
                            ? undefined
                            : valueShortened
                        );
                      }
                    }}
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
}
