import React, { useState } from 'react';
import SearchDropdown from '@/components/common/SearchDropDown';
import { TimeOfDay } from '@/types/StudyGroup';
import { Subject } from '@/types/Subject';
import { parseSubjectToOption, translatePreference } from '@/utils/Formatter';
import { SearchGroup } from '@/app/(protected)/groups/page';
import Input from '@/components/common/Input';

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
  const [name, setName] = useState<string>(searchParameters.name ?? '');
  const [selectedSubject, setSelectedSubject] = useState<number | undefined>(
    searchParameters.subject
  );
  const [myGroups, setMyGroups] = React.useState<boolean>(
    searchParameters.isMyGroup ?? false
  );
  const [timePreference, setTimePreference] = React.useState<string[]>(
    searchParameters.timeOfDay ?? []
  );

  function handleNameChange(value: string) {
    setName(value);
    onSearchParametersChange({
      name: value,
      subject: selectedSubject,
      isMyGroup: myGroups,
      timeOfDay: timePreference,
    });
  }

  function handleSubjectChange(value: string) {
    let selectedSubject: number | undefined;
    if (value !== '') {
      selectedSubject = parseInt(value);
    }
    setSelectedSubject(selectedSubject);
    onSearchParametersChange({
      name: name,
      subject: selectedSubject,
      isMyGroup: myGroups,
      timeOfDay: timePreference,
    });
  }

  function handleMyGroupsChange(value: boolean) {
    setMyGroups(value);
    onSearchParametersChange({
      name: name,
      subject: selectedSubject,
      isMyGroup: value,
      timeOfDay: timePreference,
    });
  }

  function handleTimePreferenceChange(value: string[]) {
    setTimePreference(value);
    onSearchParametersChange({
      name: name,
      subject: selectedSubject,
      isMyGroup: myGroups,
      timeOfDay: value,
    });
  }

  return (
    <div className='flex flex-col'>
      <div className='mt-4 px-4'>
        <h4 className='font-poppins font-bold text-blackTextColor'>Grupo</h4>
        <Input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={(e) => {
            handleNameChange(e.target.value);
          }}
          classNameInput='bg-backgroundInput max-w-sm'
          maxLength={40}
        />
      </div>
      <div className={'h-3'} />
      <div className='mt-4 px-4'>
        <h4 className='font-poppins font-bold text-blackTextColor'>Materia</h4>
        <SearchDropdown
          id='dropdown'
          options={parseSubjectToOption(subjects)}
          required={true}
          placeholder=''
          initialValue={
            subjects.find((subject) => subject.id === selectedSubject)?.name
          }
          onChange={(value) => {
            handleSubjectChange(value);
          }}
          marginTopAndBottom={0}
        />
      </div>
      <div className={'h-4'} />
      <div className='px-4 pt-4'>
        <label className='font-poppins font-bold'>
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
        <h4 className='mt-4 px-4 font-poppins font-bold'>
          Preferencia horaria
        </h4>
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
                        handleTimePreferenceChange(valueShortened);
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
    </div>
  );
}
