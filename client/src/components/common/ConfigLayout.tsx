import React from 'react';

export function ConfigLayout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className='flex w-full justify-center bg-primaryBlue md:flex'>
        <p className='flex w-[98%] items-center border-t-2 border-gray-500 py-5 text-2xl text-white'>
          <strong className='pl-6 font-poppins md:ml-12'>{title}</strong>
        </p>
      </div>
      <div className='flex min-h-[500px] justify-center py-5'>
        <div className='block w-[98vw] rounded-lg md:w-[90%] lg:w-[85%] xl:w-[40%]'>
          {children}
        </div>
      </div>
    </div>
  );
}
