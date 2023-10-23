import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';
import LocationIcon from '@/assets/Icons/LocationIcon';
import { dateFormat } from '@/utils/Formatter';

type CardSessionProps = {
  session: any; // that type will specific when conect this to back
  isHistory?: boolean;
};

export default function CardSession({
  session,
  isHistory = false,
}: CardSessionProps) {
  const { name, location, start_time, attendances, end_time } =
    session.sessions;
  let accepted = 0;
  let pending = 0;
  let denied = 0;

  attendances.map((member: any) => {
    const status = member.status;
    if (status === 'accepted') accepted += 1;
    if (status === 'pending') pending += 1;
    if (status === 'denied') denied += 1;
  });

  return (
    <div className='grid grid-rows-3 gap-3 border border-solid border-gray-200 bg-white p-4'>
      <div className='flex gap-5 font-poppins font-bold text-primaryBlue '>
        <div>{dateFormat(start_time, end_time, isHistory)}</div>
        <div className='flex'>
          <LocationIcon className='h-5 w-5' />
          {location}
        </div>
      </div>
      <div className='font-poppins text-xl text-primaryBlue'>{name}</div>
      <div className='flex text-gray-500'>
        <GroupSizeIcon className='mr-1 h-5 w-5' /> {accepted} si,{denied} no,
        {pending} pendientes{' '}
      </div>
    </div>
  );
}
