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
    <div className='w-full'>
      <div
        className={`m-2 flex  max-w-[60%] flex-col rounded-md p-2 
        text-sm shadow-lg 
        ${
          isMeMessage
            ? 'float-right w-auto bg-primaryBlue-300 text-white'
            : 'w-fit bg-white'
        } 
        whitespace-normal" overflow-hidden`}
      >
        {!isMeMessage && (
          <span className=' font-bold text-sky-500 '>{name}</span>
        )}
        <div className={`${isMeMessage ? 'mr-8' : 'mr-8'} `}>
          <span>{message}</span>
        </div>
        <div className=''>
          <span
            className={` float-right mb-2 h-2 text-[0.6rem] ${
              isMeMessage ? '' : 'text-gray-500'
            }`}
          >
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
