import Button from '@/components/common/Button';
import ClipBoard from '@/components/common/ClipBoard';
import { useRouter } from 'next/navigation';
import strings from '@/locales/strings.json';

type FormStep5Props = {
  nextPage: () => void;
  groupName: string;
  groupId?: any;
};

export default function FormStep5({
  nextPage,
  groupName,
  groupId,
}: FormStep5Props) {
  const router = useRouter();

  function handleButtonAction() {
    nextPage();
    router.push('/protected/home');
  }

  return (
    <div className='grid grid-rows-[180px,70px,80px] justify-center gap-3 sm:grid-rows-[130px,70px,80px]'>
      <div className='flex flex-col pb-2'>
        <span className='text-primaryBlue pt-4 text-2xl font-bold'>
          ¡Felicitaciones!
        </span>
        <span className='text-primaryBlue text-2xl font-bold'>
          Ahora solo faltan las personas
        </span>
        <span className='max-w-lg text-sm text-grayText'>
          El grupo &apos;{groupName}&apos; ya está pronto para recibir al resto
          de sus integrantes bajo la siguiente URL. Asegurese de compartirla con
          ellos.
        </span>
      </div>
      <ClipBoard
        id='copy-text'
        value={`${window.location.origin}/${groupId}`} // colocar la url del env porque dependiendo de eso va cambiando
        name='name'
      />
      <Button
        text={strings.form.doneButton.text}
        type='button'
        className='rounded-2xl bg-primaryBlue hover:bg-hoverPrimaryBlue'
        classNameWrapper='w-1/3 pt-3 ml-[33%] '
        onClick={handleButtonAction}
      />
    </div>
  );
}
