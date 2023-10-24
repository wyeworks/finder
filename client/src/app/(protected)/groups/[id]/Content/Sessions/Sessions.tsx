'use client';

import { StudyGroup } from '@/types/StudyGroup';
import TimePreferences from './TimePreferences';
import Button from '@/components/common/Button';
import PlusIcon from '@/assets/Icons/PlusIcon';
import CustomModal from '@/components/common/CustomModal';
import { useEffect, useState } from 'react';
import CreateSessionForm from './CreateSessionForm';
import NextSessions from './NextSessions';
import History from './History';
import { SessionService } from '@/services/SessionsService';
import { useSession } from 'next-auth/react';
import { NotOkError } from '@/types/NotOkError';
import { Logger } from '@/services/Logger';
import { BackendError } from '@/types/BackendError';
import strings from '@/locales/strings.json';

type SessionsProps = {
  group: StudyGroup;
};

// eslint-disable-next-line no-unused-vars
enum typeTabs {
  // eslint-disable-next-line no-unused-vars
  HISTORY = 'historySessions',
  // eslint-disable-next-line no-unused-vars
  NEXT = 'nextSessions',
}

export type CreateSessionData = {
  title: string;
  startTime: string;
  startHour: string;
  endTime: string;
  endHour: string;
  location: string;
  description: string;
  meetLink: string;
};

export type CreateSessionAlertProps = {
  show: boolean;
  message?: string;
  title?: string;
  alertType?: 'error' | 'success';
};

export default function Sessions({ group }: SessionsProps) {
  const { user_ids } = group;
  const groupId = group.id;
  const { data: session } = useSession();
  const [isMemberGroup, setIsMemberGroup] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tab, setTab] = useState<typeTabs>(typeTabs.NEXT);
  const [formData, setFormData] = useState<CreateSessionData>({
    title: '',
    startTime: '',
    startHour: '',
    endTime: '',
    endHour: '',
    location: '',
    description: '',
    meetLink: '',
  });
  const [touchedData, setTouchedData] = useState({
    title: false,
    startTime: false,
    startHour: false,
    endTime: false,
    endHour: false,
    location: false,
    description: false,
    meetLink: false,
  });
  const [alertProps, setAlertProps] = useState<CreateSessionAlertProps>({
    show: false,
  });

  useEffect(() => {
    const isMember = user_ids?.some(
      (userGroup) => session?.user.id && userGroup === Number(session?.user.id)
    );
    setIsMemberGroup(isMember ?? false);
  }, [session?.user.id, user_ids]);

  function addErrors(parsedError: BackendError) {
    const errorMessages = [];
    if (parsedError.errors?.name) {
      errorMessages.push(parsedError.errors.name);
    }
    if (parsedError.errors?.description) {
      errorMessages.push(parsedError.errors.description);
    }
    if (parsedError.errors?.meeting_link) {
      errorMessages.push(parsedError.errors.meeting_link);
    }
    if (parsedError.errors?.start_time) {
      errorMessages.push(parsedError.errors.start_time);
    }
    if (parsedError.errors?.end_time) {
      errorMessages.push(parsedError.errors.end_time);
    }
    if (parsedError.errors?.group_id) {
      errorMessages.push(parsedError.errors.group_id);
    }
    return errorMessages;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isCurrentFormValid = event.currentTarget.checkValidity();

    setTouchedData({
      title: true,
      startTime: true,
      startHour: true,
      endTime: true,
      endHour: true,
      location: true,
      description: true,
      meetLink: true,
    });

    if (!isCurrentFormValid) {
      return;
    }

    try {
      await SessionService.createSession(
        {
          name: formData.title,
          description: formData.description,
          location: formData.location,
          meeting_link: formData.meetLink,
          start_time: formData.startTime + '-' + formData.startHour,
          end_time: formData.endTime + '-' + formData.endHour,
          group_id: Number(groupId),
        },
        session?.user.accessToken!
      );

      setAlertProps({
        show: true,
        message: 'Sesión creada con éxito!',
        alertType: 'success',
      });
      setTimeout(() => {
        setAlertProps({ show: false });
      }, 5000);

      setFormData({
        title: '',
        startTime: '',
        startHour: '',
        endTime: '',
        endHour: '',
        location: '',
        description: '',
        meetLink: '',
      });
      setTouchedData({
        title: false,
        startTime: false,
        startHour: false,
        endTime: false,
        endHour: false,
        location: false,
        description: false,
        meetLink: false,
      });
    } catch (error) {
      if (error instanceof NotOkError) {
        const errorMessages = addErrors(error.backendError);
        const title = error.message ? error.message : 'Error';
        setAlertProps({
          show: true,
          message: errorMessages.join('\n'),
          title: title,
          alertType: 'error',
        });
        return;
      }
      Logger.debug('Error trying to create session' + { error });
      setAlertProps({
        show: true,
        message: strings.common.error.unexpectedError,
        title: 'Error',
        alertType: 'error',
      });
    }
  };

  if (!isMemberGroup) {
    return (
      <div className='border border-solid p-10 text-center'>
        Debes ser un miembro para ver las sesiones del grupo.
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-rows-[130px,auto,auto] sm:grid-rows-[90px,auto,auto]'>
        <div className='flex flex-auto gap-7 '>
          <div className='flex flex-col justify-start gap-3 sm:flex-row'>
            <Button
              text='Próximas sesiones'
              classNameWrapper='sm:p-4'
              className={`h-8 items-center border border-gray-300 bg-white text-lg !text-primaryBlue hover:bg-gray-300   ${
                tab === typeTabs.NEXT && '!bg-gray-200'
              }`}
              onClick={() => setTab(typeTabs.NEXT)}
            />
            <Button
              text='Historial'
              classNameWrapper='sm:p-4'
              className={`h-8 items-center border border-gray-300 bg-white text-lg !text-primaryBlue hover:bg-gray-300   ${
                tab === typeTabs.HISTORY && '!bg-gray-200'
              }`}
              onClick={() => setTab(typeTabs.HISTORY)}
            />
          </div>
          <div className='flex justify-end sm:w-[50%]'>
            <Button
              text='Crear sesión'
              Icon={<PlusIcon className='h-5 w-5' />}
              classNameWrapper='sm:p-4'
              spaceBetween={8}
              className=' h-8 items-center  bg-primaryBlue hover:bg-hoverPrimaryBlue'
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
        <div className='mb-5'>
          {tab === typeTabs.HISTORY && <History />}
          {tab === typeTabs.NEXT && <NextSessions />}
        </div>
        <TimePreferences group={group} />
      </div>
      <CustomModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        content={
          <CreateSessionForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            touched={touchedData}
            alertProps={alertProps}
          />
        }
        showXButton={true}
      />
    </>
  );
}
