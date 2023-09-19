import Image from 'next/image';
import confirmImage from '@/assets/images/confirm.png';
import Button from '@/components/common/Button';
import strings from '@/locales/strings.json';
import Link from 'next/link';

export default function View() {
  return (
    <div
      className='flex flex-col items-center justify-center px-4 pb-6 sm:px-6 sm:py-12 lg:px-8'
      id='confirm-view'
    >
      <h1 className='mb-8 mt-4 block w-full text-center text-2xl font-bold sm:hidden'>
        {strings.confirmation.title}
      </h1>

      <div
        id='confirm-body'
        className='mx-auto flex h-full w-full flex-col justify-between text-center sm:w-2/3'
      >
        <div>
          <Image
            src={confirmImage}
            alt='Confirmar email'
            className='mx-auto max-w-xs sm:max-w-md'
          />
          <h1 className='mt-4 font-bold'>{strings.confirmation.headerText}</h1>
          <p className='mt-2'>{strings.confirmation.infoText}</p>
        </div>

        <Link href={'/signin'}>
          <Button
            type='button'
            id='confirm-button'
            text={strings.form.logInButton.text}
            className='mx-auto mb-4 mt-5 w-full sm:mb-0'
          />
        </Link>
      </div>
    </div>
  );
}
