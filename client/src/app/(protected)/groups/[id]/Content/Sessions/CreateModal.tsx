import BarsIcon from '@/assets/Icons/BarsIcon';
import ClockIcon from '@/assets/Icons/ClockIcon';
import LinkIcon from '@/assets/Icons/LinkIcon';
import LocationIcon from '@/assets/Icons/LocationIcon';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';

export default function CreateModal() {
  return (
    <div className='m-2 grid grid-cols-[20px,auto] grid-rows-[50px,50px,50px,50px,auto,50px] gap-x-3'>
      <input
        type='text'
        className='col-span-2 h-fit w-[90%] border-b border-gray-300 text-xl focus:border-gray-600 focus:outline-none'
        placeholder='Añade un titulo'
      />
      <ClockIcon className='mr-2 mt-1 h-5 w-5' />
      <div className='flex justify-center gap-3 align-baseline'>
        <Input
          type='date'
          id='startTime'
          name='startTime'
          classNameInput='bg-backgroundInput'
          minNumber={new Date().toISOString().split('T')[0]}
        />
        -
        <Input
          type='number'
          id='startHour'
          name='startHour'
          placeholder='17:00'
          required
          pattern='/^[0-9]{2}:[0-9]{2}$/'
          classNameInput='bg-backgroundInput'
          classNameWrapper='mb-4'
        />
      </div>
      <div />
      <div className='flex items-baseline justify-center gap-3'>
        <Input
          type='date'
          id='endTime'
          name='endTime'
          placeholder='Date'
          classNameInput='bg-backgroundInput text-grayText'
          minNumber={new Date().toISOString().split('T')[0]}
        />
        -
        <Input
          type='number'
          id='endHour'
          name='endHour'
          placeholder='19:00'
          required
          pattern='/^[0-9]{2}:[0-9]{2}$/'
          classNameInput='bg-backgroundInput'
          classNameWrapper='mb-4'
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
      />
      <BarsIcon className='mr-2 h-5 w-5' />
      <TextArea
        id='description'
        name='description'
        placeholder='Ingrese la descripcion de la session'
        className='pt-3'
        classNameWrapper='mb-3'
        required
      />
      <LinkIcon className='mr-2 h-5 w-5' />
      <Input
        type='text'
        id='meet-link'
        name='meet-link'
        placeholder='meet.google.com/vwv-aaet-jvs'
        required
        classNameInput='bg-backgroundInput'
      />
    </div>
  );
}
