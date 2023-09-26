import Button from '@/components/common/Button';
import Dropdown from '@/components/common/DropDown';
import { Option } from '@/types/Option';
import strings from '@/locales/strings.json';
import { Dispatch, SetStateAction } from 'react';
import { CreateGroupData } from '../page';
import { TimeOfDay } from '@/types/StudyGroup';
import { translatePreference, translateSpanishDays } from '@/utils/Formatter';

const preferences: Option[] = [
  { key: TimeOfDay.No, label: translatePreference(TimeOfDay.No) },
  {
    key: TimeOfDay.NoPreferences,
    label: translatePreference(TimeOfDay.NoPreferences),
  },
  { key: TimeOfDay.Afternoon, label: translatePreference(TimeOfDay.Afternoon) },
  { key: TimeOfDay.Morning, label: translatePreference(TimeOfDay.Morning) },
  { key: TimeOfDay.Night, label: translatePreference(TimeOfDay.Night) },
];

type FormStep4Props = {
  setValue: Dispatch<SetStateAction<CreateGroupData>>;
  handleSubmit: () => void;
};

export default function FormStep4({ setValue, handleSubmit }: FormStep4Props) {
  const spanishDays = Object.keys(translateSpanishDays);

  function setTimePreference(day: string, newValue: string) {
    setValue((prevState: any) => {
      const updatedTimePreference = { ...prevState.timePreference };
      if (newValue === '') {
        delete updatedTimePreference[translateSpanishDays[day]];
      } else {
        updatedTimePreference[translateSpanishDays[day]] = newValue;
      }
      return {
        ...prevState,
        timePreference: updatedTimePreference,
      };
    });
  }

  return (
    <div className='grid grid-rows-[160px,auto,80px] justify-center sm:grid-rows-[110px,auto,80px]'>
      <div className='flex flex-col pb-2'>
        <span className='text-primaryBlue pt-4 text-2xl font-bold'>
          Si tiene horarios para juntarse...
        </span>
        <span className='max-w-lg text-sm text-grayText'>
          En el caso de que el grupo tenga alguna preferencia horaria para sus
          sesiones, dejalo claro con los integrantes pero también podrás
          actualizarlo más tarde.
        </span>
      </div>
      <div className='my-3'>
        {spanishDays.map((day, index) => {
          function handleTime(value: string) {
            setTimePreference(day, value);
          }
          return (
            <div key={index}>
              <Dropdown
                id={`dropdown-${day}`}
                options={preferences}
                label={day}
                onSelect={handleTime}
              />
            </div>
          );
        })}
      </div>
      <Button
        text={strings.form.nextButton.text}
        type='button'
        className='rounded-2xl bg-primaryBlue hover:bg-hoverPrimaryBlue'
        classNameWrapper='w-1/3 mt-2'
        onClick={() => {
          handleSubmit();
        }}
      />
    </div>
  );
}
