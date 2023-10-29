import Link from 'next/link';
import Form from './Form';
import FinderLogoIcon from '@/assets/Icons/FinderLogoIcon';

export default function View() {
  return (
    <div
      className='grid-row-3 grid min-h-full justify-center px-6 pb-6 sm:py-12 lg:px-8'
      id='recover-pass-view'
    >
      <div id='recover-pass-header' className='grid'>
        <h2 className='mt-6 flex items-center justify-center gap-3 text-center font-sans text-4xl font-bold leading-9 tracking-tight text-primaryBlue'>
          <FinderLogoIcon fill='#242760' height={50} width={41.666} />
          finder
        </h2>
        <h2 className='mt-4 text-center font-poppins text-2xl font-medium leading-9 tracking-tight text-gray-900 sm:mt-10'>
          ¿Olvidatse tu contraseña?
        </h2>
        <p className='mt-1 text-center font-poppins text-sm font-light tracking-tight text-gray-400'>
          Te enviaremos un correo electrónico para ayudarte
        </p>
      </div>
      <div id='recover-pass-body'>
        <Form />
      </div>
      <div>
        <p className='mt-5 text-center font-poppins text-sm text-gray-500'>
          Volver a
          <Link
            href='/signin'
            className='font-poppins font-semibold leading-6 text-lightBlue hover:text-lightBlue-100'
          >
            {' '}
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
