'use client';

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
import { TimeOfDay, TimePreference } from '@/types/StudyGroup';
import CrossIcon from '@/assets/Icons/CrossIcon';
import FinderLogoIcon from '@/assets/Icons/FinderLogoIcon';
import { useSession } from 'next-auth/react';
import { GroupService } from '@/services/GroupService';

export type CreateGroupData = {
  name: string;
  subjectId: string;
  description: string;
  size: string;
  groupId?: string;
  timePreference: TimePreference;
};

export default function CreateGroup() {
  const { data: session } = useSession();
  const router = useRouter();
  const [actualStep, setActualStep] = useState<number>(1);
  const barWidth = `${(actualStep / 5) * 100}%`;
  const noPreferences = TimeOfDay.NoPreferences;
  const [createGroupData, setCreateGroupData] = useState<CreateGroupData>({
    name: '',
    subjectId: '',
    description: '',
    size: '',
    timePreference: {
      Sunday: noPreferences,
      Monday: noPreferences,
      Tuesday: noPreferences,
      Wednesday: noPreferences,
      Thursday: noPreferences,
      Friday: noPreferences,
      Saturday: noPreferences,
    },
  });
  const [error, setError] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  function nextPage() {
    if (actualStep < 5) {
      setActualStep(actualStep + 1);
    }
  }

  function backPage() {
    setActualStep(actualStep - 1);
  }

  async function handleSubmit() {
    try {
      const response = await GroupService.createGroup(
        {
          name: createGroupData.name,
          description: createGroupData.description,
          size: createGroupData.size,
          subject_id: createGroupData.subjectId,
          time_preferences: createGroupData.timePreference,
        },
        session?.user.accessToken!,
        {
          handleNotOk: false,
          asJSON: false,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const parsedError = errorData as BackendError;
        const errorMessages = [];

        if (parsedError.errors.name) {
          errorMessages.push(parsedError.errors.name);
        }
        if (parsedError.errors.subject) {
          errorMessages.push(parsedError.errors.subject);
        }
        if (parsedError.errors.description) {
          errorMessages.push(parsedError.errors.description);
        }
        if (parsedError.errors.size) {
          errorMessages.push(parsedError.errors.size);
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
      Logger.debug('Error trying to create groups' + { error });
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
    <div className='h-full bg-whiteCustom '>
      <div className='grid-rows-[150px, auto] grid'>
        <div className='grid grid-rows-3 gap-4 bg-whiteCustom pt-4'>
          <div className='grid grid-cols-3 items-center'>
            <div>
              {actualStep !== 5 && !error && (
                <button
                  className='flex items-center gap-3 pl-3 text-start'
                  onClick={() => router.push('/home')}
                >
                  <CrossIcon className='h-4 w-4' /> Cancelar
                </button>
              )}
            </div>
            <h1
              className='flex min-w-[150px] cursor-pointer items-center justify-center gap-3 text-center text-3xl font-bold text-primaryBlue'
              onClick={() => router.push('/home')}
            >
              <FinderLogoIcon fill='#242760' height={50} width={41.666} />
              finder
            </h1>
          </div>
          <div className='mb-2 mt-2 h-2 overflow-hidden bg-gray-200'>
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
            <FormStep2
              nextPage={nextPage}
              setValue={setCreateGroupData}
              back={backPage}
            />
          )}
          {actualStep === 3 && (
            <FormStep3
              nextPage={nextPage}
              setValue={setCreateGroupData}
              groupName={createGroupData.name}
              back={backPage}
              size={createGroupData.size}
            />
          )}
          {actualStep === 4 && (
            <FormStep4
              setValue={setCreateGroupData}
              handleSubmit={handleSubmit}
              back={backPage}
            />
          )}
          {actualStep === 5 && handleStep5()}
        </div>
      </div>
    </div>
  );
}
