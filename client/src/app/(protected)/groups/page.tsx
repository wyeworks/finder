import React from 'react';
import InnerPage from './InnerPage';
import Button from '@/components/common/Button';
import PlusIcon from '@/assets/Icons/PlusIcon';
import Link from 'next/link';

//We can search groups by name, subject, timeOfDay, and isMyGroup
export interface SearchGroup {
  name?: string;
  subject?: number;
  timeOfDay?: string[];
  isMyGroup?: boolean;
}

export default function Groups() {
  return (
    <div className='flex h-full flex-col'>
      <div className='flex w-full justify-center bg-primaryBlue md:flex'>
        <div className='flex w-[98%] items-center justify-center border-t-2 border-gray-500 py-5 text-2xl text-white'>
          <h1 className='text-center text-4xl font-extrabold'>Grupos</h1>
          <Link href={'/groups/new'} className='absolute right-0 mr-5'>
            <Button
              text='Crear grupo'
              Icon={<PlusIcon className='h-5 w-5 md:mr-2' />}
              classNameWrapper='h-12 w-12 md:w-fit p-0 m-0 rounded-full md:rounded-md  overflow-hidden'
              className='h-12 w-12 items-center md:w-fit md:border-2'
              hideTextOnMobile={true}
            />
          </Link>
        </div>
      </div>
      <InnerPage />
    </div>
  );
}
