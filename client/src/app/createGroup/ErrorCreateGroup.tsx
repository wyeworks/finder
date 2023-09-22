import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import Alert from '@/components/common/Alert';

type ErrorCreateGroupProps = {
  nextPage: () => void;
  groupName: string;
};

export default function ErrorCreateGroup({
  nextPage,
  groupName,
}: ErrorCreateGroupProps) {
  const router = useRouter();

  function handleButtonAction() {
    nextPage();
    router.push('/protected/home');
  }

  return (
    <div className='grid grid-rows-[100px,70px,80px] justify-center gap-3 sm:grid-rows-[100px,70px,80px]'>
      <div className='flex flex-col'>
        <span className='text-primaryBlue pt-4 text-2xl font-bold'>
          Ha ocurrio un error...
        </span>
        <span className='max-w-lg text-sm text-grayText'>
          El grupo &apos;{groupName}&apos; no se pudo crear con éxito, por favor
          intente de nuevo en otro momento.
        </span>
      </div>
      <Alert isVisible alertType='error' />
      <Button
        text='Salir'
        type='button'
        className='rounded-2xl bg-primaryBlue hover:bg-hoverPrimaryBlue'
        classNameWrapper='w-1/3 pt-3 ml-[33%] '
        onClick={handleButtonAction}
      />
    </div>
  );
}
