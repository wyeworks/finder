'use client';

import LeftArrowIcon from '@/assets/Icons/LeftArrowIcon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormStep1 from './Forms/FormStep1';
import FormStep2 from './Forms/FormStep2';
import FormStep3 from './Forms/FormStep3';
import FormStep4 from './Forms/FormStep4';
import Step5 from './Step5';
import { Logger } from '@/services/Logger';
import ErrorCreateGroup from './ErrorCreateGroup';
import { BackendError } from '@/types/BackendError';
import strings from '@/locales/strings.json';
import { TimePreference } from '@/types/StudyGroup';

export type CreateGroupData = {
  name: string;
  subjectId: string;
  description: string;
  size: string;
  groupId?: string;
  timePreference: TimePreference;
};

export default function CreateGroup() {
  const router = useRouter();
  const [actualStep, setActualStep] = useState<number>(1);
  const barWidth = `${(actualStep / 5) * 100}%`;
  const [createGroupData, setCreateGroupData] = useState<CreateGroupData>({
    name: '',
    subjectId: '',
    description: '',
    size: '',
    timePreference: {},
  });
  const [error, setError] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  function nextPage() {
    if (actualStep < 5) {
      setActualStep(actualStep + 1);
    }
  }

  function backPage() {
    if (actualStep === 1) {
      router.push('/home');
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
          name: createGroupData.name,
          description: createGroupData.description,
          size: createGroupData.size,
          subject_id: createGroupData.subjectId,
          time_preferences: createGroupData.timePreference,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const parsedError = errorData as BackendError;
        const errorMessages = [];

        if (parsedError.errors.name) {
          errorMessages.push(strings.common.error.name);
        }
        if (parsedError.errors.subject) {
          errorMessages.push(strings.common.error.subject);
        }
        if (parsedError.errors.description) {
          errorMessages.push(strings.common.error.description);
        }
        if (errorMessages.length === 0) {
          errorMessages.push(strings.common.error.unexpectedError);
        }

        setAlertMessage(errorMessages.join('\n'));
        setError(true);
        nextPage();
        return;
      }
      const responseBody = await response.json();
      setCreateGroupData((prevState) => {
        return { ...prevState, groupId: responseBody.id };
      });
      nextPage();
    } catch (error) {
      Logger.debug('Error trying to create group' + { error });
      setError(true);
      nextPage();
    }
  }

  function handleStep5() {
    if (!error) {
      return (
        <Step5
          nextPage={nextPage}
          groupName={createGroupData.name}
          groupId={createGroupData.groupId}
        />
      );
    }
    return (
      <ErrorCreateGroup
        nextPage={nextPage}
        groupName={createGroupData.name}
        alertMessage={alertMessage}
      />
    );
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
            <FormStep1 nextPage={nextPage} setValue={setCreateGroupData} />
          )}
          {actualStep === 2 && (
            <FormStep2 nextPage={nextPage} setValue={setCreateGroupData} />
          )}
          {actualStep === 3 && (
            <FormStep3
              nextPage={nextPage}
              setValue={setCreateGroupData}
              groupName={createGroupData.name}
            />
          )}
          {actualStep === 4 && (
            <FormStep4
              setValue={setCreateGroupData}
              handleSubmit={handleSubmit}
            />
          )}
          {actualStep === 5 && handleStep5()}
        </div>
      </div>
    </div>
  );
}
