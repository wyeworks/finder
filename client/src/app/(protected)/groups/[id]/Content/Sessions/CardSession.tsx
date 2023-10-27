import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';
import LocationIcon from '@/assets/Icons/LocationIcon';
import { Session } from '@/types/Session';
import {
  formatDateToSpanishWithEndTime,
  formatAttendanceQauntity,
  formatDateToSpanish,
} from '@/utils/Formatter';

type CardSessionProps = {
  session: Session;
  isHistory?: boolean;
  // eslint-disable-next-line no-unused-vars
  viewSession: (id: number) => void;
};

export default function CardSession({
  session,
  isHistory = false,
  viewSession,
}: CardSessionProps) {
  if (!session) {
    return <></>;
  }

  const { name, location, start_time, attendances, end_time } = session;

  return (
    <div className='grid grid-rows-3 gap-3 border border-solid border-gray-200 bg-white p-4'>
      <div className='flex gap-5 font-poppins font-bold text-primaryBlue '>
        {isHistory && formatDateToSpanish(start_time)}
        {!isHistory && formatDateToSpanishWithEndTime(start_time, end_time)}
        {location && (
          <div className='flex'>
            <LocationIcon className='h-5 w-5' />
            {location}
          </div>
        )}
      </div>
      <div
        className='cursor-pointer font-poppins text-xl text-primaryBlue hover:text-primaryBlue-100 '
        onClick={() => viewSession(session.id)}
      >
        {name}
      </div>
      <div className='flex text-gray-500'>
        <GroupSizeIcon className='mr-1 h-5 w-5' />
        {formatAttendanceQauntity(attendances)}
      </div>
    </div>
  );
}
