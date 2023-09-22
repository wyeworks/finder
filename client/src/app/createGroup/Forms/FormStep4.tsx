import Button from '@/components/common/Button';
import Dropdown, { Option } from '@/components/common/DropDown';
import strings from '@/locales/strings.json';
import { Dispatch, SetStateAction } from 'react';
import { TimePreference } from '../page';

type FormStep4Props = {
  // nextPage: () => void;
  setValue: Dispatch<SetStateAction<TimePreference | undefined>>;
  handleSubmit: () => void;
};

// manejar estas cosas de mejor manera, hay muchos arreglos hardcodeados que no estan tan buenos, capas ponerlos en algun utils o services o algo
export default function FormStep4({ setValue, handleSubmit }: FormStep4Props) {
  const preferences: Option[] = [
    { key: '', label: 'No puedo este dia' },
    { key: 'None', label: 'Sin Preferencia' },
    { key: 'Afternoon', label: 'Mañana' },
    { key: 'Morning', label: 'Tarde' },
    { key: 'Night', label: 'Noche' },
  ];

  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const mapDays: { [key: string]: string } = {
    Domingo: 'Sunday',
    Lunes: 'Monday',
    Martes: 'Tuesday',
    Miércoles: 'Wednesday',
    Jueves: 'Thursday',
    Viernes: 'Friday',
    Sábado: 'Saturday',
  };

  // function setTimePreference(day: string, newValue: string) {
  //   setValue((prevState: any) => ({
  //     ...prevState,
  //     [mapDays[day]]: newValue,
  //   }));
  // }
  function setTimePreference(day: string, newValue: string) {
    setValue((prevState: any) => {
      const updatedState = { ...prevState };

      if (newValue === '') {
        delete updatedState[mapDays[day]];
      } else {
        updatedState[mapDays[day]] = newValue;
      }

      return updatedState;
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
        {days.map((day, index) => {
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
