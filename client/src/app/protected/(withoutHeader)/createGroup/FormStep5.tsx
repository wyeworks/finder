import Button from '@/components/common/Button';
import ClipBoard from '@/components/common/ClipBoard';

type FormStep5Props = {
  nextPage: () => void;
};

export default function FormStep5({ nextPage }: FormStep5Props) {
  return (
    <div className='grid grid-rows-[130px,70px,80px] justify-center gap-3'>
      <div className='flex flex-col pb-2'>
        <span className='pt-4 text-2xl font-bold text-[#242760]'>
          ¡Felicitaciones!
        </span>
        <span className='text-2xl font-bold text-[#242760]'>
          Ahora solo faltan las personas
        </span>
        <span className='max-w-lg text-sm text-gray-500'>
          El grupo \nombre\ ya está pronto para recibir al resto de sus
          integrantes bajo la siguiente URL. Asegurese de compartitla con ellos.
        </span>
      </div>
      <ClipBoard
        id='copy-text'
        value='www.finder.com/id_grupo' // this will be a real url
        name='name'
      />
      <Button
        text='Siguiente'
        type='button'
        className='rounded-2xl bg-sky-950 hover:bg-sky-800'
        classNameWrapper='w-1/3 pt-3 ml-[33%] '
        onClick={nextPage}
      />
    </div>
  );
}
