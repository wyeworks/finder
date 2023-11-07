'use client';

import BarsIcon from '@/assets/Icons/BarsIcon';
import ClockIcon from '@/assets/Icons/ClockIcon';
import LinkIcon from '@/assets/Icons/LinkIcon';
import LocationIcon from '@/assets/Icons/LocationIcon';
import defaultUser from '@/assets/images/default_user.png';
import { Session } from '@/types/Session';
import {
  formatAttendanceQauntity,
  formatDateToSpanish,
  getHour,
} from '@/utils/Formatter';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIconSolid';
import Image from 'next/image';
import CrossIcon from '@/assets/Icons/CrossIcon';
import CheckIcon from '@/assets/Icons/CheckIcon';
import Button from '@/components/common/Button';
import EditIcon from '@/assets/Icons/EditIcon';
import TrashIcon from '@/assets/Icons/TrashIcon';
import strings from '@/locales/strings.json';
import { Attendance } from '@/types/Attendance';
import { useSession } from 'next-auth/react';
import { ModalSessionAlertProps, addErrors } from './Sessions';
import Alert from '@/components/common/Alert';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Input from '@/components/common/Input';
import { validateHour } from '@/utils/validations';
import { SessionService } from '@/services/SessionsService';
import { Logger } from '@/services/Logger';
import { NotOkError } from '@/types/NotOkError';
import DelayedConfirmDialog from '@/app/(protected)/users/me/DelayedConfirmDialog';
import { TrashCanIcon } from '@/assets/Icons/TrashCanIcon';

type ViewSessionProps = {
  sessionGroup: Session;
  handleAttendance?: (
    // eslint-disable-next-line no-unused-vars
    status: 'accepted' | 'rejected',
    // eslint-disable-next-line no-unused-vars
    attendanceId: number
  ) => void;
  alertProps: ModalSessionAlertProps;
  showAttendanceRequest?: boolean;
  setAlertProps: Dispatch<SetStateAction<ModalSessionAlertProps>>;
  // eslint-disable-next-line no-unused-vars
  refetchSession: (id: number, showAttendance: boolean) => Promise<void>;
  isAdmin?: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  close?: () => void;
  isHistorial?: boolean;
};

function validateUrl(url: string) {
  if (url.startsWith('https://') || url.startsWith('http://')) return url;
  else return `https://${url}`;
}

export default function ViewSession({
  sessionGroup,
  handleAttendance,
  alertProps,
  showAttendanceRequest = true,
  setAlertProps,
  isAdmin = false,
  refetchSession,
  setOpenModal,
  close,
  isHistorial = false,
}: ViewSessionProps) {
  const { data: session } = useSession();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const startHour = getHour(sessionGroup.start_time);
  const endHour = getHour(sessionGroup.end_time);
  const [editData, setEditData] = useState<any>({
    name: sessionGroup.name,
    startTime: sessionGroup.start_time.split('T')[0],
    startHour: startHour,
    endTime: sessionGroup.end_time.split('T')[0],
    endHour: endHour,
    description: sessionGroup.description,
    location: sessionGroup.location,
    meetLink: sessionGroup.meeting_link,
  });

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [open, setOpen] = useState(false);

  function handleCancelDelete() {
    setOpen(false);
    Logger.debug('Cancel');
  }

  async function handleConfirm() {
    Logger.debug('Confirm');
    setOpen(false);

    try {
      await SessionService.deleteSession(
        sessionGroup.id,
        session?.user?.accessToken!
      );

      setIsAlertVisible(true);
      setAlertMessage('Sesión eliminada');
      setAlertType('success');
      close!();
    } catch (error: any) {
      Logger.error(error);
      setIsAlertVisible(true);
      setAlertMessage('No se pudo eliminar la sesión');
      setAlertType('error');
    }
  }

  useEffect(() => {
    setAlertProps({ show: false });
  }, [setAlertProps]);

  useEffect(() => {
    setEditData({
      name: sessionGroup.name,
      startTime: sessionGroup.start_time.split('T')[0],
      startHour: startHour,
      endTime: sessionGroup.end_time.split('T')[0],
      endHour: endHour,
      description: sessionGroup.description,
      location: sessionGroup.location,
      meetLink: sessionGroup.meeting_link,
    });
  }, [
    endHour,
    isEditMode,
    sessionGroup.description,
    sessionGroup.end_time,
    sessionGroup.location,
    sessionGroup.meeting_link,
    sessionGroup.name,
    sessionGroup.start_time,
    startHour,
  ]);

  const renderOptions = () => {
    const isShowOption =
      Number(session?.user?.id) === sessionGroup.creator_user_id || isAdmin;

    if (isShowOption) {
      return (
        <>
          {!isHistorial && (
            <button
              className='h-full'
              onClick={() => setIsEditMode(!isEditMode)}
              type='button'
              data-testid='edit-button'
            >
              <EditIcon className='h-[20px] w-[20px] cursor-pointer text-primaryBlue hover:text-gray-700' />
            </button>
          )}
          <button
            className='mx-2 h-full'
            type='button'
            onClick={() => setOpen(true)}
            data-testid={'delete-session-button'}
          >
            <TrashIcon className='h-[20px] w-[20px] cursor-pointer text-primaryBlue hover:text-gray-700' />
          </button>
          <DelayedConfirmDialog
            open={open}
            setOpen={setOpen}
            description={strings.form.deleteSession.confirmDialogDescription}
            title={strings.form.deleteSession.confirmDialogTitle}
            onCancel={handleCancelDelete}
            onConfirm={handleConfirm}
            confirmText={
              strings.form.deleteSession.confirmDialogConfirmButtonText
            }
            cancelText={
              strings.form.deleteSession.confirmDialogCancelButtonText
            }
            delayDuration={5}
            confirmColor={'blue'}
            icon={<TrashCanIcon width={30} height={30} />}
          />
        </>
      );
    }
  };
  const getOwnAttendance = (attendances: Attendance[]) => {
    return attendances.find(
      (attendance) => attendance.user_id === Number(session?.user?.id)
    )?.id;
  };

  function handleEditMode(renderEditMode: ReactNode, notEditMode: ReactNode) {
    if (isEditMode) {
      return renderEditMode;
    }
    return notEditMode;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (value.trim() === '' && value.length > 0) {
      return;
    }

    if (name === 'startTime') {
      setEditData((prevState: any) => ({
        ...prevState,
        ['endTime']: value,
      }));
    }
    setEditData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      return;
    }

    try {
      await SessionService.editSession(
        {
          name: editData.name,
          description: editData.description,
          location: editData.location,
          meeting_link: editData.meetLink,
          start_time: editData.startTime + '-' + editData.startHour,
          end_time: editData.endTime + '-' + editData.endHour,
        },
        sessionGroup.id,
        session?.user.accessToken!
      );
      setIsEditMode(false);
      setAlertProps({ show: false });
      setOpenModal(false);
      refetchSession(sessionGroup.id, true);
    } catch (error) {
      Logger.debug('Error trying to edit session', { error });
      let errorMessages: any[] = [];
      let titleError = null;
      if (error instanceof NotOkError) {
        errorMessages = addErrors(error.backendError);
        titleError = error.message ? error.message : 'Error';
      }
      if (errorMessages.length === 0)
        errorMessages.push(strings.common.error.unexpectedError);
      setAlertProps({
        show: true,
        message: errorMessages.join('\n'),
        title: titleError ?? 'Error',
        alertType: 'error',
      });
    }
  };

  function renderModalFooter() {
    if (isEditMode) {
      return (
        <div className='-mb-2 flex items-center border-t border-t-gray-300 pt-1'>
          <div className='flex w-full justify-center'>
            <Button
              text='Guardar'
              type='submit'
              classNameWrapper='p-1 pb-0'
              className='h-8 w-1/3 items-center bg-primaryBlue !p-5 hover:bg-hoverPrimaryBlue'
            />
          </div>
        </div>
      );
    }
    if (showAttendanceRequest) {
      return (
        <div className='-mb-2 flex items-center border-t border-t-gray-300 pt-1'>
          <h1 className='font-poppins'>{strings.viewSession.inviteQuestion}</h1>
          <div className='flex w-full justify-end'>
            <Button
              text='Si'
              type='button'
              Icon={
                <CheckIcon className='mr-2 h-5 w-5 shrink-0 text-green-600' />
              }
              onClick={() => {
                const attendanceId = getOwnAttendance(sessionGroup.attendances);
                if (attendanceId) {
                  handleAttendance?.('accepted', attendanceId);
                }
              }}
              classNameWrapper='p-1'
              className='h-8 items-center border-[1.5px]  border-green-600 !bg-transparent !font-medium !text-green-600 hover:!bg-gray-200 '
            />
            <Button
              text='No'
              type='button'
              Icon={
                <CrossIcon className='mr-1 h-5 w-5 shrink-0 text-red-600' />
              }
              classNameWrapper='p-1 w-auto'
              className=' h-8 items-center border-[1.5px]  border-red-600 !bg-transparent !font-medium !text-red-600 hover:!bg-gray-200'
              onClick={() => {
                const attendanceId = getOwnAttendance(sessionGroup.attendances);
                if (attendanceId) {
                  handleAttendance?.('rejected', attendanceId);
                }
              }}
            />
          </div>
        </div>
      );
    }
  }

  function handleRenderLocation() {
    return (
      <>
        {!sessionGroup.location ? (
          <h1 className='mt-2 font-poppins text-grayText'>
            {strings.viewSession.noLocation}
          </h1>
        ) : (
          <h1 className='mt-2 font-poppins font-semibold text-blackTextColor'>
            {sessionGroup.location}
          </h1>
        )}
      </>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div
        className='m-2 grid grid-cols-[20px,auto]  gap-x-3 gap-y-8 sm:gap-y-[10px]'
        data-testid='view-sesion'
      >
        <div />
        <div className='my-3 flex h-6'>
          <h1 className='peer mt-0 h-fit w-[90%] font-poppins text-xl font-medium text-primaryBlue'>
            {handleEditMode(
              <Input
                type='text'
                id='name'
                name='name'
                newClassNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-blue-950 focus:outline-none'
                onChange={handleChange}
                maxLength={35}
                value={editData.name}
                required
                touched={true}
                validateText={strings.createSession.form.validateText.default}
                data-testid='name'
              />,
              <span>{sessionGroup.name}</span>
            )}
          </h1>
          {renderOptions()}
        </div>
        <>
          <ClockIcon className='mr-2 mt-2 h-5 w-5' />
          <div
            className={`${
              isEditMode ? 'my-1 flex flex-col' : 'mt-1 block items-baseline'
            } gap-3`}
          >
            {handleEditMode(
              <div className='item-end flex'>
                <Input
                  type='date'
                  id='startTime'
                  name='startTime'
                  newClassNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-blue-950 focus:outline-none'
                  onChange={handleChange}
                  value={editData.startTime}
                  required
                  touched={true}
                  validateText={strings.createSession.form.validateText.date}
                  minNumber={new Date().toISOString().split('T')[0]}
                />
                <Input
                  type='text'
                  id='startHour'
                  name='startHour'
                  newClassNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-blue-950 focus:outline-none'
                  onChange={handleChange}
                  value={editData.startHour}
                  required
                  touched={true}
                  pattern='[0-2][0-9]:[0-5][0-9]'
                  validateText={validateHour(editData.endTime)}
                  maxLength={5}
                />
              </div>,
              <h1 className='font-poppins font-semibold text-blackTextColor'>
                {formatDateToSpanish(sessionGroup.start_time)}
              </h1>
            )}
            {handleEditMode(
              <div className='item-end flex'>
                <Input
                  type='date'
                  id='endTime'
                  name='endTime'
                  newClassNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-blue-950 focus:outline-none'
                  onChange={handleChange}
                  value={editData.endTime}
                  required
                  touched={true}
                  validateText={strings.createSession.form.validateText.date}
                  minNumber={editData.startTime}
                />
                <Input
                  type='text'
                  id='endHour'
                  name='endHour'
                  newClassNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-blue-950 focus:outline-none'
                  onChange={handleChange}
                  value={editData.endHour}
                  required
                  touched={true}
                  pattern='[0-2][0-9]:[0-5][0-9]'
                  validateText={validateHour(editData.endHour)}
                  maxLength={5}
                />
              </div>,
              <h1 className='font-poppins font-semibold text-blackTextColor'>
                {formatDateToSpanish(sessionGroup.end_time)}
              </h1>
            )}
          </div>
          <LocationIcon className='mr-2 mt-2 h-5 w-5' />
          {handleEditMode(
            <Input
              type='text'
              id='location'
              name='location'
              newClassNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-blue-950 focus:outline-none'
              onChange={handleChange}
              maxLength={35}
              value={editData.location ?? ''}
              classNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-gray-600 focus:outline-none'
            />,
            handleRenderLocation()
          )}
          <BarsIcon className='mr-2 mt-1 h-5 w-5' />
          {handleEditMode(
            <Input
              type='text'
              id='description'
              name='description'
              newClassNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-blue-950 focus:outline-none'
              onChange={handleChange}
              maxLength={200}
              value={editData.description ?? ''}
              classNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-gray-600 focus:outline-none'
            />,

            <p className='overflow-auto break-words font-poppins text-grayText'>
              {!sessionGroup.description
                ? strings.viewSession.noDescription
                : sessionGroup.description}
            </p>
          )}
          <LinkIcon className='mr-2 mt-2 h-5 w-5' />
          {handleEditMode(
            <Input
              type='text'
              id='meetLink'
              name='meetLink'
              newClassNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-blue-950 focus:outline-none'
              onChange={handleChange}
              value={editData.meetLink ?? ''}
              classNameInput='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-gray-600 focus:outline-none'
              touched={true}
              maxLength={60}
              validateText={strings.createSession.form.validateText.meetLink}
              pattern='https?://.*\..*'
            />,
            <>
              {!sessionGroup.meeting_link ? (
                <p className='mt-1 font-poppins text-grayText'>
                  {strings.viewSession.noMeetLink}
                </p>
              ) : (
                <a
                  className='mt-1 font-poppins text-blue-700 hover:underline'
                  href={validateUrl(sessionGroup.meeting_link ?? '')}
                  target='_blank'
                >
                  {sessionGroup.meeting_link}
                </a>
              )}
            </>
          )}
        </>
        <GroupSizeIcon className='mr-2 mt-2 h-5 w-5 text-grayText' />
        <div>
          <p className='mt-2 font-poppins text-grayText'>
            {formatAttendanceQauntity(sessionGroup.attendances)}
          </p>
          <div className='mt-2 block'>
            {sessionGroup.attendances.map((attendance) => {
              return (
                <div key={attendance.id} className='mb-2 flex'>
                  <div className='relative h-8 min-w-[30px]'>
                    <Image
                      alt='Avatar'
                      src={defaultUser}
                      className='rounded-full bg-slate-400 shadow-sm'
                      width={30}
                      height={30}
                    />
                    {attendance.status === 'accepted' && (
                      <CheckIcon className='absolute bottom-0 left-5  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-200 stroke-2 p-[.9px] font-bold text-green-800' />
                    )}
                    {attendance.status === 'rejected' && (
                      <CrossIcon className='absolute bottom-0 left-5  h-3.5 w-3.5 rounded-full border-2 border-white bg-red-300 stroke-2 p-[.9px] text-red-600' />
                    )}
                  </div>
                  <p className='ml-3 font-poppins text-inputTextColor'>
                    {attendance.member_name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {renderModalFooter()}
      <div className='mt-3'>
        <Alert
          isVisible={alertProps.show}
          message={alertProps.message}
          title={alertProps.title}
          alertType={alertProps.alertType}
          withTitle={Boolean(alertProps.title)}
        />
        <Alert
          isVisible={isAlertVisible}
          message={alertMessage}
          alertType={alertType}
          title={'Eliminar Sesion'}
        />
      </div>
    </form>
  );
}
