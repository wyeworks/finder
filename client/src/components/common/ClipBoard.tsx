import ClipBoardIcon from '@/assets/Icons/ClipBoardIcon';

type ClipBoardProps = {
  id: string;
  name: string;
  value: string;
};

export default function ClipBoard({ id, name, value }: ClipBoardProps) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className='relative justify-center'>
      <div>
        <input
          id={id}
          name={name}
          value={value}
          className='block w-full rounded-md border-0 px-3 py-1.5 pr-8 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
          disabled
        />
        <span
          className='absolute inset-y-0 right-0 mt-2 flex h-fit items-center pr-3 text-gray-400 transition duration-300 ease-in-out hover:text-gray-500 active:text-gray-800'
          onClick={handleCopyClick}
        >
          <ClipBoardIcon className='h-4 w-4' />
        </span>
      </div>
    </div>
  );
}
