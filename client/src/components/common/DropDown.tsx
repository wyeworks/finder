import ArrowDownIcon from '@/assets/Icons/ArrowDownIcon';
import { useState } from 'react';
import { Option } from '@/types/Option';

type DropdownProps = {
  id: string;
  label?: string;
  options: Option[];
  required?: boolean;
  validateText?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (value: string) => void;
  initialValue?: string;
  maxWidth?: boolean;
  paddingTB?: number;
};

export default function Dropdown({
  id,
  label,
  options,
  onSelect,
  initialValue,
  maxWidth = true,
  paddingTB = 3,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    initialValue ?? options[0].label ?? 'Seleccione un valor...'
  );

  const handleOptionClick = (value: string, key: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onSelect) onSelect(key);
  };

  return (
    <div
      data-testid={id}
      className={`${maxWidth && 'max-w-sm'} justify-center my-${paddingTB} `}
    >
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
            role='dropdown'
            onClick={() => setIsOpen(!isOpen)}
            className='flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
            data-testid={id + '-' + selectedValue}
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
                  onClick={() => handleOptionClick(option.label, option.key)}
                  className='cursor-pointer px-3 py-2 text-sm text-gray-900 hover:bg-gray-200'
                  role='options'
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
