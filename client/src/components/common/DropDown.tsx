import ArrowDownIcon from '@/assets/Icons/ArrowDownIcon';
import { useState } from 'react';

export type Option = {
  label: string;
  key: string;
};

type DropdownProps = {
  id: string;
  label?: string;
  options: Option[];
  required?: boolean;
  validateText?: string;
  maxWidth?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (value: string) => void;
};

export default function Dropdown({
  id,
  label,
  options,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    options[0].label ?? 'Seleccione un valor...'
  );

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onSelect) onSelect(value);
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
            <ArrowDownIcon
              className={`ml-2 h-5 w-5 ${isOpen ? 'rotate-180 transform' : ''}`}
            />
          </div>
          {isOpen && (
            <ul className='absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white shadow-lg '>
              {options.map((option) => (
                <li
                  key={option.key}
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
