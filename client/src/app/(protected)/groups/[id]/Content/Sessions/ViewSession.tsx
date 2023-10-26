'use client';

import BarsIcon from '@/assets/Icons/BarsIcon';
import ClockIcon from '@/assets/Icons/ClockIcon';
import LinkIcon from '@/assets/Icons/LinkIcon';
import LocationIcon from '@/assets/Icons/LocationIcon';
import { Session } from '@/types/Session';
import {
  formatAttendanceQauntity,
  formatDateToSpanish,
} from '@/utils/Formatter';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIconSolid';

type ViewSessionProps = {
  session: Session;
};

function validateUrl(url: string) {
  if (url.startsWith('https://')) return url;
  else return `https://${url}`;
}

export default function CreateSessionForm({ session }: ViewSessionProps) {
  return (
    <form
      className='m-2 grid grid-cols-[20px,auto] grid-rows-[50px,50px,50px,50px,auto,50px,125px] gap-x-3 gap-y-8 sm:gap-y-[10px] '
      noValidate
      data-testid='create-sesion'
    >
      <div className='col-span-2'>
        <h1 className='peer h-fit w-[90%] font-poppins text-xl text-primaryBlue'>
          {session.name}
        </h1>
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
      <h1 className='mt-2 font-poppins font-semibold text-blackTextColor'>
        {session.location}
      </h1>

      <BarsIcon className='mr-2 mt-1 h-5 w-5' />
      <p className='font-poppins text-grayText'>{session.description}</p>
      <LinkIcon className='mr-2 mt-2 h-5 w-5' />
      <a
        className='mt-1 font-poppins text-blue-700 hover:underline'
        href={validateUrl(session.meeting_link)}
        target='_blank'
      >
        {session.meeting_link}
      </a>
      <GroupSizeIcon className='mr-2 mt-2 h-5 w-5 text-grayText' />
      <div>
        <p className='mt-1 font-poppins text-grayText'>
          {formatAttendanceQauntity(session.attendances)}
        </p>
        {session.attendances.map((attendance) => {
          return <>{attendance.id}</>;
        })}
      </div>

      {/* <Input
        type='text'
        id='meetLink'
        name='meetLink'
        placeholder={strings.createSession.form.placeholders.meetLink}
        classNameInput='bg-backgroundInput'
        value={formData.meetLink}
        onChange={handleChange}
        touched={touched.meetLink}
        validateText={strings.createSession.form.validateText.meetLink}
        pattern='.*\..*'
      />
      <div className='col-span-2 flex flex-col justify-center gap-1'>
        <Alert
          isVisible={alertProps.show}
          message={alertProps.message}
          title={alertProps.title}
          alertType={alertProps.alertType}
          withTitle={Boolean(alertProps.title)}
        />
        <div className='col-span-2 flex justify-center'>
          <Button
            text={strings.createSession.form.submitText}
            className='h-fit w-1/3 bg-primaryBlue hover:bg-hoverPrimaryBlue'
            type='submit'
          />
        </div>
      </div> */}
    </form>
  );
}
