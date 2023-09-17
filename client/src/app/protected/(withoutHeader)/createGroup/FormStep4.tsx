import Button from '@/components/common/Button';
import Dropdown, { Option } from '@/components/common/DropDown';
import strings from '@/locales/strings.json';

type FormStep4Props = {
  nextPage: () => void;
};

export default function FormStep4({ nextPage }: FormStep4Props) {
  const subjects: Option[] = [
    { label: 'Sin Preferencia' },
    { label: 'Mañana' },
    { label: 'Tarde' },
    { label: 'Noche' },
  ];
  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];
  return (
    <div className='grid grid-rows-[160px,auto,80px] justify-center sm:grid-rows-[110px,auto,80px]'>
      <div className='flex flex-col pb-2'>
        <span className='text-primaryBlue pt-4 text-2xl font-bold'>
          Si tiene horarios para juntarse...
        </span>
        <span className='max-w-lg text-sm text-grayText'>
          En el caso de que el grupo tenga alguna preferencia horaria para sus
          sessiones, dejalo claro con los integrantes pero también podrás
          actualizarlo más tarde
        </span>
      </div>
      <div className='my-3'>
        {days.map((day, index) => {
          return (
            <div key={index}>
              <Dropdown id={`dropdown-${day}`} options={subjects} label={day} />
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
