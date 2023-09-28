import Link from 'next/link';
import Form from './Form';

export default function View() {
  return (
    <div
      className='grid-row-3 grid min-h-full justify-center px-6 pb-6 sm:py-12 lg:px-8'
      id='register-view'
    >
      <div id='register-header'>
        <h2 className='mt-6 block text-center font-sans text-4xl font-bold leading-9 tracking-tight text-gray-900 md:hidden'>
          finder.com
        </h2>
        <h2 className='mt-4 text-center text-2xl font-normal leading-9 tracking-tight text-gray-900 sm:mt-10'>
          Registrarse
        </h2>
        <p className='mt-1 text-center text-sm tracking-tight text-gray-400'>
          Crea tu cuenta para empezar a buscar grupos de estudio
        </p>
      </div>
      <div id='register-body'>
        <Form />
      </div>
      <div>
        <p className='mt-5 text-center text-sm text-gray-500'>
          ¿Ya estás registrado?
          <Link
            href='/signin'
            className='font-semibold leading-6 text-blue-600 hover:text-blue-500'
          >
            {' '}
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
