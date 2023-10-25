import React from 'react';
import InnerPage from './InnerPage';

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
      <div className='flex w-full justify-center bg-primaryBlue'>
        <p className='flex w-[98%] items-center justify-center border-t-2 border-gray-500 py-5 text-2xl text-white'>
          <h1 className='text-center text-4xl font-extrabold'>Grupos</h1>
        </p>
      </div>
      <InnerPage />
    </div>
  );
}
