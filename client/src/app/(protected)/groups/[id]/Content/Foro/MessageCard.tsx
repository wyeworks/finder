type MessageCardProps = {
  isMeMessage: boolean;
  message: string;
  date: string;
  name: string;
};

export default function MessageCard({
  isMeMessage,
  message,
  date,
  name,
}: MessageCardProps) {
  return (
    <div
      className={`m-2 flex w-3/5 flex-col rounded-md p-2 
        text-sm shadow-lg 
        ${
          isMeMessage
            ? 'float-right bg-primaryBlue-300 text-white'
            : 'bg-white '
        } 
        whitespace-normal" overflow-hidden`}
    >
      {!isMeMessage && <span className=' font-bold text-sky-500 '>{name}</span>}
      <div className=''>
        <span>{message}</span>
      </div>
      <div className=''>
        <span
          className={` float-right h-2 text-[0.6rem] ${
            isMeMessage ? '' : 'text-gray-500'
          }`}
        >
          {date}
        </span>
      </div>
    </div>
  );
}
