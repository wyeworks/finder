import ArrowDownIcon from '@/assets/Icons/ArrowDownIcon';
import { removeAccents } from '@/utils/Formatter';
import { useEffect, useState } from 'react';
import { Option } from '@/types/Option';

type DropdownProps = {
  id: string;
  label?: string;
  options: Option[];
  required?: boolean;
  validateText?: string;
  maxWidth?: boolean;
  onChange: React.Dispatch<React.SetStateAction<Option>>;
  placeholder: string;
};

export default function SearchDropdown({
  id,
  label,
  options,
  onChange,
  placeholder,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  useEffect(() => {
    const filtered = options.filter((option) =>
      removeAccents(option.label.toLowerCase()).includes(
        removeAccents(selectedValue.toLowerCase())
      )
    );
    setFilteredOptions(filtered);
  }, [selectedValue, options]);

  const handleChangeOption = (value: string, key: string) => {
    setSelectedValue(value);
    onChange({ key, label: value });
    setIsOpen(false);
  };

  function handleChangeInput(value: string) {
    setSelectedValue(value);
    onChange((prevState: Option) => ({
      ...prevState,
      label: value,
    }));
  }

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
          <input
            type='text'
            value={selectedValue}
            onChange={(e) => handleChangeInput(e.target.value)}
            onClick={() => setIsOpen(!isOpen)}
            id={id}
            data-testid={id}
            placeholder={placeholder}
            className='peer mr-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6' // Agrega margen derecho
          />
          <span className='pointer-events-none absolute inset-y-0 right-0 mt-2 flex h-fit items-center pr-3'>
            <ArrowDownIcon
              className={`h-5 w-5 ${isOpen ? 'rotate-180 transform' : ''}`}
            />
          </span>
          {isOpen && (
            <ul className='absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white shadow-lg '>
              {filteredOptions.map((option) => (
                <li
                  key={option.key}
                  onClick={() => handleChangeOption(option.label, option.key)}
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
