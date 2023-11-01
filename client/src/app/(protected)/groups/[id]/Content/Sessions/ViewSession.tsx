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
import { signOut, useSession } from 'next-auth/react';
import { ModalSessionAlertProps } from './Sessions';
import Alert from '@/components/common/Alert';
import React, { useState } from 'react';
import DelayedConfirmDialog from '@/app/(protected)/users/me/DelayedConfirmDialog';
import { TrashCanIcon } from '@/assets/Icons/TrashCanIcon';
import { Logger } from '@/services/Logger';
import { SessionService } from '@/services/SessionsService';

type ViewSessionProps = {
  sessionGroup: Session;
  // eslint-disable-next-line no-unused-vars
  handleAttendance?: (
    // eslint-disable-next-line no-unused-vars
    status: 'accepted' | 'rejected',
    // eslint-disable-next-line no-unused-vars
    attendanceId: number
  ) => void;
  alertProps: ModalSessionAlertProps;
  showAttendanceRequest?: boolean;
  isAdmin?: boolean;
};

function validateUrl(url: string) {
  if (url.startsWith('https://')) return url;
  else return `https://${url}`;
}

function DatesLayout(props: { sessionGroup: Session }) {
  return (
    <>
      <ClockIcon className='mr-2 mt-2 h-5 w-5' />
      <div className='mt-1 block items-baseline gap-3'>
        <h1 className='font-poppins font-semibold text-blackTextColor'>
          {formatDateToSpanish(props.sessionGroup.start_time)}
        </h1>
        <h1 className='font-poppins font-semibold text-blackTextColor'>
          {formatDateToSpanish(props.sessionGroup.end_time)}
        </h1>
      </div>
    </>
  );
}

function AttendancesLayout(props: { sessionGroup: Session }) {
  return (
    <div>
      <p className='mt-2 font-poppins text-grayText'>
        {formatAttendanceQauntity(props.sessionGroup.attendances)}
      </p>
      <div className='mt-2 block'>
        {props.sessionGroup.attendances.map((attendance) => {
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
  );
}

function ButtonsLayout(props: { onDelete: () => void }) {
  return (
    <>
      <button className='h-full'>
        <EditIcon className='h-[20px] w-[20px] cursor-pointer text-primaryBlue hover:text-gray-700' />
      </button>
      <button
        className='mx-2 h-full'
        onClick={props.onDelete}
        data-testid={'delete-session-button'}
      >
        <TrashIcon className='h-[20px] w-[20px] cursor-pointer text-primaryBlue hover:text-gray-700' />
      </button>
    </>
  );
}

function AttendanceRequestLayout(props: {
  sessionGroup: Session;
  handleAttendance?: (
    // eslint-disable-next-line no-unused-vars
    status: 'accepted' | 'rejected',
    // eslint-disable-next-line no-unused-vars
    attendanceId: number
  ) => void;
}) {
  const { data: session } = useSession();

  const getOwnAttendance = (attendances: Attendance[]) => {
    return attendances.find(
      (attendance) => attendance.user_id === Number(session!.user?.id)
    )?.id;
  };

  return (
    <div className='-mb-2 flex items-center border-t border-t-gray-300 pt-1'>
      <h1 className='font-poppins'>{strings.viewSession.inviteQuestion}</h1>
      <div className='flex w-full justify-end'>
        <Button
          text='Si'
          type='button'
          Icon={<CheckIcon className='mr-2 h-5 w-5 shrink-0 text-green-600' />}
          onClick={() => {
            const attendanceId = getOwnAttendance(
              props.sessionGroup.attendances
            );
            if (attendanceId) {
              props.handleAttendance?.('accepted', attendanceId);
            }
          }}
          classNameWrapper='p-1'
          className='h-8 items-center border-[1.5px]  border-green-600 !bg-transparent !font-medium !text-green-600 hover:!bg-gray-200 '
        />
        <Button
          text='No'
          type='button'
          Icon={<CrossIcon className='mr-1 h-5 w-5 shrink-0 text-red-600' />}
          classNameWrapper='p-1 w-auto'
          className=' h-8 items-center border-[1.5px]  border-red-600 !bg-transparent !font-medium !text-red-600 hover:!bg-gray-200'
          onClick={() => {
            const attendanceId = getOwnAttendance(
              props.sessionGroup.attendances
            );
            if (attendanceId) {
              props.handleAttendance?.('rejected', attendanceId);
            }
          }}
        />
      </div>
    </div>
  );
}

function MeetingLink(props: { link: string | null }) {
  return (
    <>
      {props.link ? (
        <a
          className='mt-1 font-poppins text-blue-700 hover:underline'
          href={validateUrl(props.link ?? '')}
          target='_blank'
        >
          {props.link}
        </a>
      ) : (
        <p className='mt-1 font-poppins text-grayText'>
          {strings.viewSession.noMeetLink}
        </p>
      )}
    </>
  );
}

export default function ViewSession({
  sessionGroup,
  handleAttendance,
  alertProps,
  showAttendanceRequest = true,
  isAdmin = false,
}: ViewSessionProps) {
  const { data: session } = useSession();

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [open, setOpen] = useState(false);

  const showOptions = () => {
    return (
      Number(session?.user?.id) === sessionGroup.creator_user_id || isAdmin
    );
  };

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
      setAlertMessage('Sesión eliminado');
      setAlertType('success');

      setTimeout(() => {
        signOut().catch((error) => Logger.error(error));
      }, 1000);
    } catch (error: any) {
      Logger.error(error);
      setIsAlertVisible(true);
      setAlertMessage('No se pudo eliminar la sesión');
      setAlertType('error');
    }
  }

  return (
    <div>
      <div
        className='m-2 grid grid-cols-[20px,auto]  gap-x-3 gap-y-8 sm:gap-y-[10px]'
        data-testid='view-sesion'
      >
        <div className='col-span-2 flex h-6'>
          <h1 className='peer mt-0 h-fit w-[90%] font-poppins text-xl text-primaryBlue'>
            {sessionGroup.name}
          </h1>
          {showOptions() && (
            <ButtonsLayout
              onDelete={() => {
                setIsAlertVisible(false);
                setOpen(true);
              }}
            />
          )}
        </div>
        <DatesLayout sessionGroup={sessionGroup} />
        <LocationIcon className='mr-2 mt-2 h-5 w-5' />
        <h1
          className={
            !sessionGroup.location
              ? 'mt-2 font-poppins text-grayText'
              : 'mt-2 font-poppins font-semibold text-blackTextColor'
          }
        >
          {!sessionGroup.location
            ? strings.viewSession.noLocation
            : sessionGroup.location}
        </h1>

        <BarsIcon className='mr-2 mt-1 h-5 w-5' />
        <p className='font-poppins text-grayText'>
          {!sessionGroup.description
            ? strings.viewSession.noDescription
            : sessionGroup.description}
        </p>
        <LinkIcon className='mr-2 mt-2 h-5 w-5' />
        <MeetingLink link={sessionGroup.meeting_link} />
        <GroupSizeIcon className='mr-2 mt-2 h-5 w-5 text-grayText' />
        <AttendancesLayout sessionGroup={sessionGroup} />
      </div>
      {showAttendanceRequest && (
        <AttendanceRequestLayout
          sessionGroup={sessionGroup}
          handleAttendance={handleAttendance}
        />
      )}
      <div className='mt-3'>
        <Alert
          isVisible={alertProps.show}
          message={alertProps.message}
          title={alertProps.title}
          alertType={alertProps.alertType}
          withTitle={Boolean(alertProps.title)}
        />
      </div>
      <DelayedConfirmDialog
        open={open}
        setOpen={setOpen}
        description={strings.form.deleteUser.confirmDialogDescription}
        title={strings.form.deleteUser.confirmDialogTitle}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirm}
        confirmText={strings.form.deleteUser.confirmDialogConfirmButtonText}
        cancelText={strings.form.deleteUser.confirmDialogCancelButtonText}
        delayDuration={5}
        confirmColor={'blue'}
        icon={<TrashCanIcon width={30} height={30} />}
      />
      <Alert
        isVisible={isAlertVisible}
        message={alertMessage}
        alertType={alertType}
        title={'Eliminar Sesion'}
      />
    </div>
  );
}
