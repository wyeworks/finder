import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';

type FormStep3Props = {
  nextPage: () => void;
};

export default function FormStep3({ nextPage }: FormStep3Props) {
  return (
    <div className='grid grid-rows-[80px,140px,80px] justify-center gap-3'>
      <div className='flex flex-col gap-2 pb-2'>
        <span className='pt-4 text-2xl font-bold text-[#242760]'>
          Describe tu Grupo
        </span>
        <span className='max-w-[30rem] text-sm text-gray-500 '>
          Esto será lo que verá cualquier persona uando encuentre tu grupo,pero
          támbien podrás actualizarlo más trade
        </span>
      </div>
      <TextArea
        id='name'
        name='name'
        placeholder='Grupo de <Materia>'
        maxWidth={false}
        className='pt-3'
        classNameWrapper='mt-3'
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
