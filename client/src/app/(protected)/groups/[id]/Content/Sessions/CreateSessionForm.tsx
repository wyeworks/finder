import BarsIcon from '@/assets/Icons/BarsIcon';
import ClockIcon from '@/assets/Icons/ClockIcon';
import LinkIcon from '@/assets/Icons/LinkIcon';
import LocationIcon from '@/assets/Icons/LocationIcon';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import { CreateSessionData } from './Sessions';
import Button from '@/components/common/Button';

type CreateSessionModalProps = {
  formData: CreateSessionData;
  setFormData: any; // change this ttype
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  touched: any;
};

export default function CreateSessionForm({
  formData,
  setFormData,
  handleSubmit,
  touched,
}: CreateSessionModalProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'startTime') {
      setFormData((prevState: CreateSessionData) => ({
        ...prevState,
        ['endTime']: '',
      }));
    }
    setFormData((prevState: CreateSessionData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateHour = (value: any) => {
    const pattern = /^[0-2][0-9]:[0-5][0-9]$/;
    if (value !== '' && !pattern.test(value)) {
      return 'Debe ser hh:mm';
    }
    return 'No puede ser vacio';
  };

  return (
    <form
      className='m-2 grid grid-cols-[20px,auto] grid-rows-[50px,50px,50px,50px,auto,50px,70px] gap-x-3 gap-y-[10px]'
      noValidate
      onSubmit={handleSubmit}
    >
      <div className='col-span-2'>
        <input
          name='tittle'
          type='text'
          className='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-gray-600 focus:outline-none'
          placeholder='Añade un titulo'
          value={formData.tittle}
          onChange={handleChange}
          required
        />
        {touched.tittle && (
          <p className='invisible text-sm text-red-600 peer-invalid:visible'>
            No puede ser vacio
          </p>
        )}
      </div>
      <ClockIcon className='mr-2 mt-1 h-5 w-5' />
      <div className='flex justify-center gap-3 align-baseline'>
        <Input
          type='date'
          id='startTime'
          name='startTime'
          classNameInput='bg-backgroundInput col-span-2 h-fit w-[90%] border-b border-gray-300 text-xl focus:border-gray-600 focus:outline-none'
          minNumber={new Date().toISOString().split('T')[0]}
          value={formData.startTime}
          onChange={handleChange}
          required
          touched={touched.startTime}
          validateText='El campo no puede estar vacio'
        />
        <span className='mt-1'>-</span>
        <Input
          type='text'
          id='startHour'
          name='startHour'
          placeholder='hh:mm'
          required
          classNameInput='bg-backgroundInput'
          classNameWrapper='mb-4'
          value={formData.startHour}
          onChange={handleChange}
          touched={touched.startHour}
          validateText={validateHour(formData.startHour)}
          pattern='[0-2][0-9]:[0-5][0-9]'
        />
      </div>
      <div />
      <div className='flex items-baseline justify-center gap-3'>
        <Input
          type='date'
          id='endTime'
          name='endTime'
          placeholder='Date'
          classNameInput='bg-backgroundInput disabled:bg-gray-200'
          minNumber={formData.startTime}
          value={formData.endTime}
          onChange={handleChange}
          required
          touched={touched.endTime}
          validateText='El campo no puede estar vacio'
          disabled={formData.startTime === ''}
        />
        -
        <Input
          type='text'
          id='endHour'
          name='endHour'
          placeholder='hh:mm'
          required
          classNameInput='bg-backgroundInput disabled:bg-gray-200'
          classNameWrapper='mb-4'
          value={formData.endHour}
          onChange={handleChange}
          touched={touched.endHour}
          validateText={validateHour(formData.endHour)}
          pattern='[0-2][0-9]:[0-5][0-9]'
          disabled={formData.startTime === ''}
        />
      </div>
      <LocationIcon className='mr-2 mt-1 h-5 w-5' />
      <Input
        type='text'
        id='location'
        name='location'
        placeholder='Ingrese la ubicacion aquí'
        required
        classNameInput='bg-backgroundInput'
        value={formData.location}
        onChange={handleChange}
        touched={touched.location}
        validateText='El campo no puede estar vacio'
      />
      <BarsIcon className='mr-2 h-5 w-5' />
      <TextArea
        id='description'
        name='description'
        placeholder='Ingrese la descripcion de la session'
        className='pt-3'
        classNameWrapper='mb-3'
        required
        value={formData.description}
        onChange={handleChange}
        touched={touched.description}
        validateText='El campo no puede estar vacio'
      />
      <LinkIcon className='mr-2 h-5 w-5' />
      <Input
        type='text'
        id='meetLink'
        name='meetLink'
        placeholder='link de la reunion'
        required
        classNameInput='bg-backgroundInput'
        value={formData.meetLink}
        onChange={handleChange}
        touched={touched.meetLink}
        validateText='El campo no puede estar vacio'
      />
      <div className='col-span-2 mt-4 flex justify-center'>
        <Button
          text='Guardar'
          classNameWrapper='p-4'
          className='h-fit w-1/3 bg-primaryBlue hover:bg-hoverPrimaryBlue'
          type='submit'
        />
      </div>
    </form>
  );
}
