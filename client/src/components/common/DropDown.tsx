import { useState } from 'react';

export type Option = {
  label: string;
};

type DropdownParams = {
  id: string;
  label?: string;
  options: Option[];
  required?: boolean;
  validateText?: string;
  maxWidth?: boolean;
};

export default function Dropdown({ id, label, options }: DropdownParams) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(options[0].label);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className='my-3 max-w-sm justify-center'>
      {label && (
        <label
          htmlFor={id}
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          {label}
        </label>
      )}
      <div className='relative -mb-3'>
        <div className='relative'>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className='flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
          >
            {selectedValue}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`ml-2 h-5 w-5 ${isOpen ? 'rotate-180 transform' : ''}`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
          {isOpen && (
            <ul className='absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg'>
              {options.map((option) => (
                <li
                  key={option.label}
                  onClick={() => handleOptionClick(option.label)}
                  className='cursor-pointer px-3 py-2 text-sm text-gray-900 hover:bg-gray-200'
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
