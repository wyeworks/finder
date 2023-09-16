export type Option = {
  label: string;
};

type DropdownProps = {
  id: string;
  label?: string;
  options: Option[];
  Icon?: React.ReactNode;
};

export default function Dropdown({ label, options, id, Icon }: DropdownProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          {label}
        </label>
      )}
      <div className='relative mt-2'>
        {Icon && (
          <span className='pointer-events-none absolute inset-y-0 left-0 mt-2 flex h-fit items-center pl-3 pt-1'>
            {Icon}
          </span>
        )}
        <select
          className={`block h-10 w-full appearance-none rounded-md border-0 border-gray-300 bg-white 
                        px-3 py-2 pr-8 leading-tight text-gray-900
                        shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-gray-500
                        focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600
                        sm:text-sm sm:leading-6 ${Icon && 'pl-10'}`}
        >
          {options.map((item, index) => {
            return <option key={index}>{item.label}</option>;
          })}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='h-5 w-5'
          >
            <path
              fillRule='evenodd'
              d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
