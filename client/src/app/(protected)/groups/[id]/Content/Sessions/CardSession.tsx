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
};

export default function CardSession({
  session,
  isHistory = false,
}: CardSessionProps) {
  if (!session) {
    return <></>;
  }

  const { name, location, start_time, attendances, end_time } = session;

  return (
    <div className='grid cursor-pointer grid-rows-3 gap-3 bg-white p-4 hover:bg-gray-100'>
      <div className='flex justify-between gap-5 font-poppins font-bold text-primaryBlue '>
        {isHistory && formatDateToSpanish(start_time)}
        {!isHistory && formatDateToSpanishWithEndTime(start_time, end_time)}
        {location && (
          <div className='flex'>
            <LocationIcon className='h-5 w-5' />
            {location}
          </div>
        )}
      </div>
      <div className='cursor-pointer overflow-auto break-all font-poppins text-xl text-primaryBlue'>
        {name}
      </div>
      <div className='flex text-gray-500'>
        <GroupSizeIcon className='mr-1 h-5 w-5' />
        {formatAttendanceQauntity(attendances)}
      </div>
    </div>
  );
}
