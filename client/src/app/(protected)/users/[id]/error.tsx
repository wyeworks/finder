'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Button from '@/components/common/Button';
import Link from 'next/link';
import { Logger } from '@/services/Logger';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    Logger.error(error);
  }, [error]);

  return (
    <div className='flex items-center justify-center'>
      <h2>Ha ocurrido un error inesperado!</h2>
      <Link href={'/home'}>
        <Button text={'Inicio'} />
      </Link>
      <Button text={'Reintentar'} onClick={reset} />
    </div>
  );
}
