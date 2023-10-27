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

type ViewSessionProps = {
  session: Session;
};

function validateUrl(url: string) {
  if (url.startsWith('https://')) return url;
  else return `https://${url}`;
}

export default function CreateSessionForm({ session }: ViewSessionProps) {
  return (
    <div>
      <div
        className='m-2 grid grid-cols-[20px,auto]  gap-x-3 gap-y-8 sm:gap-y-[10px]'
        data-testid='view-sesion'
      >
        <div className='col-span-2 flex h-6'>
          <h1 className='peer mt-0 h-fit w-[90%] font-poppins text-xl text-primaryBlue'>
            {session.name}
          </h1>
          <button className='h-full'>
            <EditIcon className='h-[20px] w-[20px] cursor-pointer text-primaryBlue hover:text-gray-700' />
          </button>
          <button className='mx-2 h-full'>
            <TrashIcon className='h-[20px] w-[20px] cursor-pointer text-primaryBlue hover:text-gray-700' />
          </button>
        </div>
        <ClockIcon className='mr-2 mt-2 h-5 w-5' />
        <div className='mt-1 block items-baseline gap-3'>
          <h1 className='font-poppins font-semibold text-blackTextColor'>
            {formatDateToSpanish(session.start_time)}
          </h1>
          <h1 className='font-poppins font-semibold text-blackTextColor'>
            {formatDateToSpanish(session.end_time)}
          </h1>
        </div>
        <LocationIcon className='mr-2 mt-2 h-5 w-5' />
        <h1
          className={
            !session.location
              ? 'mt-2 font-poppins text-grayText'
              : 'mt-2 font-poppins font-semibold text-blackTextColor'
          }
        >
          {!session.location
            ? strings.viewSession.noLocation
            : session.location}
        </h1>

        <BarsIcon className='mr-2 mt-1 h-5 w-5' />
        <p className='font-poppins text-grayText'>
          {!session.description
            ? strings.viewSession.noDescription
            : session.description}
        </p>
        <LinkIcon className='mr-2 mt-2 h-5 w-5' />
        {!session.meeting_link ? (
          <p className='mt-1 font-poppins text-grayText'>
            {strings.viewSession.noMeetLink}
          </p>
        ) : (
          <a
            className='mt-1 font-poppins text-blue-700 hover:underline'
            href={validateUrl(session.meeting_link ?? '')}
            target='_blank'
          >
            {session.meeting_link}
          </a>
        )}
        <GroupSizeIcon className='mr-2 mt-2 h-5 w-5 text-grayText' />
        <div>
          <p className='mt-2 font-poppins text-grayText'>
            {formatAttendanceQauntity(session.attendances)}
          </p>
          <div className='mt-2 block'>
            {session.attendances.map((attendance) => {
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
      <div className='-mb-2 flex items-center border-t border-t-gray-300 pt-1'>
        <h1 className='font-poppins'>{strings.viewSession.inviteQuestion}</h1>
        <div className='flex w-full justify-end'>
          <Button
            text='Si'
            type='button'
            Icon={
              <CheckIcon className='mr-2 h-5 w-5 shrink-0 text-green-600' />
            }
            classNameWrapper='p-1'
            className='h-8 items-center border-[1.5px]  border-green-600 !bg-transparent !font-medium !text-green-600 hover:!bg-gray-200 '
          />
          <Button
            text='No'
            type='button'
            Icon={<CrossIcon className='mr-1 h-5 w-5 shrink-0 text-red-600' />}
            classNameWrapper='p-1 w-auto'
            className=' h-8 items-center border-[1.5px]  border-red-600 !bg-transparent !font-medium !text-red-600 hover:!bg-gray-200'
          />
        </div>
      </div>
    </div>
  );
}
