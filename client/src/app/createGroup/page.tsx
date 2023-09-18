'use client';

import LeftArrowIcon from '@/assets/Icons/LeftArrowIcon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormStep1 from './Forms/FormStep1';
import FormStep2 from './Forms/FormStep2';
import FormStep3 from './Forms/FormStep3';
import FormStep4 from './Forms/FormStep4';
import FormStep5 from './Forms/FormStep5';

export default function CreateGroup() {
  const router = useRouter();
  const [actualStep, setActualStep] = useState<number>(1);
  const barWidth = `${(actualStep / 5) * 100}%`;

  function nextPage() {
    if (actualStep < 5) {
      setActualStep(actualStep + 1);
    }
  }

  function backPage() {
    if (actualStep === 1) {
      router.push('/protected/home');
      return;
    }
    setActualStep(actualStep - 1);
  }

  return (
    <div className='h-screen bg-whiteCustom '>
      <div className='grid-rows-[150px, auto] grid'>
        <div className='grid grid-rows-3 gap-4 bg-whiteCustom pt-4'>
          <div className='grid grid-cols-3'>
            <button
              className='flex items-center gap-3 pl-3 text-start'
              onClick={() => backPage()}
            >
              <LeftArrowIcon className='h-4 w-4' /> Volver
            </button>
            <h1 className='text-primaryBlue text-center text-3xl font-bold'>
              finder.com
            </h1>
          </div>
          <div className='mb-4 mt-4 overflow-hidden bg-gray-200'>
            <div style={{ width: barWidth }} className='h-2 bg-primaryBlue' />
          </div>
          <div className='text-center text-grayText'>
            Paso {actualStep} de 5
          </div>
        </div>
        <div className='m-3 bg-whiteCustom'>
          {actualStep === 1 && <FormStep1 nextPage={nextPage} />}
          {actualStep === 2 && <FormStep2 nextPage={nextPage} />}
          {actualStep === 3 && <FormStep3 nextPage={nextPage} />}
          {actualStep === 4 && <FormStep4 nextPage={nextPage} />}
          {actualStep === 5 && <FormStep5 nextPage={nextPage} />}
        </div>
      </div>
    </div>
  );
}
