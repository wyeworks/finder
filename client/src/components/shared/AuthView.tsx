import { ReactNode } from 'react';
import Image from 'next/image';
import studentsImage from '@/assets/images/students.png';

type AuthFlowProps = {
  children: ReactNode;
};

export default function AuthView({ children }: AuthFlowProps) {
  return (
    <div
      className='flex h-full items-center justify-center bg-gray-100'
      id='container'
    >
      <div
        className='flex h-full max-w-5xl items-stretch overflow-y-auto rounded-lg bg-white shadow-lg sm:h-auto'
        id='flex-container'
      >
        {/* Left side (Image) - hidden on mobile */}
        <div
          className='relative hidden w-1/2 flex-shrink-0 items-center justify-center overflow-hidden md:flex'
          id='image-container'
        >
          <Image
            src={studentsImage}
            alt='Grupo de estudiantes'
            className='h-full w-full object-cover'
            width={600}
            height={600}
          />
        </div>
        {/* Right side (View Component) */}
        <div className='w-full md:w-1/2' id='children-container'>
          {children}
        </div>
      </div>
    </div>
  );
}
