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
import { Session } from '@/types/Session';
import ViewSession from './ViewSession';
import { filterExpiredSessions, filterNextSessions } from '@/utils/Filters';

type SessionsProps = {
  group: StudyGroup;
  fetchGroup?: () => void;
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

export type ModalSessionAlertProps = {
  show: boolean;
  message?: string;
  title?: string;
  alertType?: 'error' | 'success';
};

export function addErrors(parsedError: BackendError) {
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

export default function Sessions({ group, fetchGroup }: SessionsProps) {
  const { user_ids, admin_ids } = group;
  const groupId = group.id;
  const { data: session } = useSession();
  const [isMemberGroup, setIsMemberGroup] = useState<boolean>(false);
  const [isAdminGroup, setIsAdminGroup] = useState<boolean>(false);
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
  const [alertProps, setAlertProps] = useState<ModalSessionAlertProps>({
    show: false,
  });
  const [selectedSession, setSelectedSession] = useState<Session>({
    id: 0,
    name: '',
    description: '',
    location: '',
    meeting_link: '',
    start_time: '',
    end_time: '',
    group_id: 0,
    attendances: [],
    creator_id: 0,
    creator_user_id: 0,
  });
  const [createSelected, setCreateSelected] = useState<boolean>(false);
  const [showAttendance, setShowAttendance] = useState<boolean>(false);
  const [viewSelected, setViewSelected] = useState<boolean>(false);
  const [isFromHistorial, setIsFromHistorial] = useState<boolean>(false);

  useEffect(() => {
    const isMember = user_ids?.some(
      (userGroup) => session?.user.id && userGroup === Number(session?.user.id)
    );
    const isAdmin = admin_ids?.some(
      (adminGroup) =>
        session?.user.id && adminGroup === Number(session?.user.id)
    );
    setIsAdminGroup(isAdmin ?? false);
    setIsMemberGroup(isMember ?? false);
  }, [admin_ids, session?.user.id, user_ids]);

  useEffect(() => {
    if (!openModal) {
      setCreateSelected(false);
      setViewSelected(false);
    }
  }, [openModal]);

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
        message: '¡Sesión creada con éxito!',
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
      if (fetchGroup) fetchGroup();
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

  const viewSession = async (
    id: number,
    showAttendance: boolean,
    isHistorial: boolean = false
  ) => {
    const response = await SessionService.getSession(
      id,
      session?.user.accessToken!
    );
    if (response) {
      setIsFromHistorial(isHistorial);
      setOpenModal(true);
      setViewSelected(true);
      setSelectedSession(response);
      setShowAttendance(showAttendance);
      if (fetchGroup) fetchGroup();
    }
  };

  const handleAttendance = async (
    status: 'accepted' | 'rejected',
    attendanceId: number
  ) => {
    setAlertProps({
      show: false,
      message: '',
      title: '',
      alertType: 'error',
    });
    try {
      await SessionService.updateAttendance(
        attendanceId,
        session?.user.accessToken!,
        { attendance: { status: status } }
      );
      setAlertProps({
        show: true,
        message: '¡Tu asistencia se ha marcado con éxito!',
        alertType: 'success',
      });
      viewSession(selectedSession.id, showAttendance);
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
      Logger.debug('Error trying to update attendance' + { error });
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
      <div>
        <div className='my-4 border border-solid bg-white p-10 text-center'>
          Debes ser un miembro para ver las sesiones del grupo.
        </div>
        <TimePreferences group={group} />
      </div>
    );
  }

  const getModalContent = function () {
    return createSelected ? (
      <CreateSessionForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        touched={touchedData}
        alertProps={alertProps}
      />
    ) : viewSelected ? (
      <ViewSession
        sessionGroup={selectedSession}
        handleAttendance={handleAttendance}
        alertProps={alertProps}
        showAttendanceRequest={showAttendance}
        setAlertProps={setAlertProps}
        isAdmin={isAdminGroup}
        refetchSession={viewSession}
        setOpenModal={setOpenModal}

        close={() => {
          setOpenModal(false);
          fetchGroup!();
        }}
        isHistorial={isFromHistorial}
      />
    ) : (
      <></>
    );
  };

  return (
    <>
      <div className='grid grid-rows-[130px,auto,auto] sm:grid-rows-[90px,auto,auto]'>
        <div className='flex flex-auto gap-7 '>
          <div className='flex w-[50%] flex-col justify-start gap-3 sm:flex-row'>
            <Button
              text='Próximas sesiones'
              classNameWrapper='sm:py-4'
              className={`h-11 items-center border border-gray-300 bg-white !text-primaryBlue hover:!bg-gray-300 md:text-xl ${
                tab === typeTabs.NEXT && '!bg-gray-200'
              }`}
              onClick={() => setTab(typeTabs.NEXT)}
            />
            <Button
              text='Historial'
              classNameWrapper='sm:py-4'
              className={`h-11 items-center border border-gray-300 bg-white !text-primaryBlue hover:!bg-gray-300 md:text-xl   ${
                tab === typeTabs.HISTORY && '!bg-gray-200'
              }`}
              onClick={() => setTab(typeTabs.HISTORY)}
            />
          </div>
          <div className='flex justify-end sm:w-[50%]'>
            <Button
              text='Crear sesión'
              Icon={<PlusIcon className='h-5 w-5' />}
              classNameWrapper='sm:p-4 sm:pr-0'
              spaceBetween={8}
              className=' h-11 items-center  bg-primaryBlue hover:bg-hoverPrimaryBlue'
              onClick={() => {
                setCreateSelected(true);
                setOpenModal(true);
                setAlertProps({ show: false });
              }}
            />
          </div>
        </div>
        <div className='mb-5'>
          {tab === typeTabs.HISTORY && (
            <History
              sessions={filterExpiredSessions(group.sessions)}
              viewSession={viewSession}
            />
          )}
          {tab === typeTabs.NEXT && (
            <NextSessions
              sessions={filterNextSessions(group.sessions)}
              viewSession={viewSession}
            />
          )}
        </div>
        <TimePreferences group={group} />
      </div>
      <CustomModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        content={getModalContent()}
        showXButton={true}
      />
    </>
  );
}
