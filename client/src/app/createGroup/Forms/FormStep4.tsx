import Button from '@/components/common/Button';
import Dropdown from '@/components/common/DropDown';
import { Option } from '@/types/Option';
import strings from '@/locales/strings.json';
import { Dispatch, SetStateAction } from 'react';
import { CreateGroupData } from '../page';

const mappingDays: { [key: string]: string } = {
  Domingo: 'Sunday',
  Lunes: 'Monday',
  Martes: 'Tuesday',
  Miércoles: 'Wednesday',
  Jueves: 'Thursday',
  Viernes: 'Friday',
  Sábado: 'Saturday',
};

const preferences: Option[] = [
  { key: '', label: 'No puedo este dia' },
  { key: 'None', label: 'Sin Preferencia' },
  { key: 'Afternoon', label: 'Mañana' },
  { key: 'Morning', label: 'Tarde' },
  { key: 'Night', label: 'Noche' },
];

type FormStep4Props = {
  setValue: Dispatch<SetStateAction<CreateGroupData>>;
  handleSubmit: () => void;
};

export default function FormStep4({ setValue, handleSubmit }: FormStep4Props) {
  const spanishDays = Object.keys(mappingDays);

  function setTimePreference(day: string, newValue: string) {
    setValue((prevState: any) => {
      const updatedTimePreference = { ...prevState.timePreference };
      if (newValue === '') {
        delete updatedTimePreference[mappingDays[day]];
      } else {
        updatedTimePreference[mappingDays[day]] = newValue;
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
