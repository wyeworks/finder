import Button from '@/components/common/Button';
import Dropdown, { Option } from '@/components/common/DropDown';
import strings from '@/locales/strings.json';
import { removeAccents } from '@/utils/Formatter';
import { Dispatch, SetStateAction } from 'react';

type FormStep4Props = {
  nextPage: () => void;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function FormStep4({ nextPage, setValue }: FormStep4Props) {
  const preferences: Option[] = [
    { key: '0', label: 'Sin Preferencia' },
    { key: '1', label: 'Mañana' },
    { key: '2', label: 'Tarde' },
    { key: '3', label: 'Noche' },
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

  function setTimePreference(day: string, newValue: string) {
    setValue((prevState: any) => ({
      ...prevState,
      [removeAccents(day)]: newValue,
    }));
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
        onClick={nextPage}
      />
    </div>
  );
}
