import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

type FormStep2Props = {
  nextPage: () => void;
};

export default function FormStep2({ nextPage }: FormStep2Props) {
  return (
    <div className='grid grid-rows-[80px,80px,80px] justify-center'>
      <div className='flex flex-col pb-2'>
        <span className='pt-4 text-2xl font-bold text-[#242760]'>
          Indica un nombre para el grupo
        </span>
        <span className='text-sm text-gray-500'>
          Elije un nombre que ayude las personasa saber e que trata el grupo
        </span>
      </div>
      <Input
        type='text'
        id='name'
        name='name'
        placeholder='Grupo de <Materia>'
        maxWidth={false}
        className='pt-3'
      />
      <Button
        text='Siguiente'
        type='button'
        className='rounded-2xl bg-sky-950 hover:bg-sky-800'
        classNameWrapper='w-1/3'
        onClick={nextPage}
      />
    </div>
  );
}
