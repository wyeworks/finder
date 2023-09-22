/* eslint-disable no-unused-vars */
'use client';

import LeftArrowIcon from '@/assets/Icons/LeftArrowIcon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FormStep1 from './Forms/FormStep1';
import FormStep2 from './Forms/FormStep2';
import FormStep3 from './Forms/FormStep3';
import FormStep4 from './Forms/FormStep4';
import Step5 from './Step5';
import { Logger } from '@/services/Logger';
import ErrorCreateGroup from './ErrorCreateGroup';

export type Subject = {
  id: number;
  name: string;
  code: string;
  credits: number;
};

export type TimePreference = {
  Monday?: string;
  Tuesday?: string;
  Wednesday?: string;
  Thursday?: string;
  Friday?: string;
  Saturday?: string;
  Sunday?: string;
};

export default function CreateGroup() {
  const router = useRouter();
  const [actualStep, setActualStep] = useState<number>(1);
  const barWidth = `${(actualStep / 5) * 100}%`;
  const [groupName, setGroupName] = useState<string>('');
  const [subject, setSubject] = useState<Subject>();
  const [description, setDescription] = useState<string>('');
  const [timePreference, setTimePreference] = useState<TimePreference>();
  const [error, setError] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<string>('');

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

  async function handleSubmit() {
    try {
      const response = await fetch('/api/createGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: groupName,
          description: description,
          size: 7,
          subject_id: subject,
          time_preferences: timePreference,
        }),
      });

      if (!response.ok) {
        setError(true);
        nextPage();
        return;
      }
      const responseBody = await response.json();
      setGroupId(responseBody.id);
      nextPage();
    } catch (error) {
      Logger.debug('Error trying to create group' + { error });
    }
  }

  function handleStep5() {
    if (!error) {
      return (
        <Step5 nextPage={nextPage} groupName={groupName} groupId={groupId} />
      );
    }
    return <ErrorCreateGroup nextPage={nextPage} groupName={groupName} />;
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
          {actualStep === 1 && (
            <FormStep1 nextPage={nextPage} setValue={setSubject} />
          )}
          {actualStep === 2 && (
            <FormStep2 nextPage={nextPage} setValue={setGroupName} />
          )}
          {actualStep === 3 && (
            <FormStep3
              nextPage={nextPage}
              setValue={setDescription}
              groupName={groupName}
            />
          )}
          {actualStep === 4 && (
            <FormStep4
              setValue={setTimePreference}
              handleSubmit={handleSubmit}
            />
          )}
          {actualStep === 5 && handleStep5()}
        </div>
      </div>
    </div>
  );
}
