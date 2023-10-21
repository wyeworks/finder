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
  setOptionValue?: React.Dispatch<React.SetStateAction<Option>>;
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  disableOption?: (option: Option) => boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  disableText?: string;
};

export default function SearchDropdown({
  id,
  label,
  options,
  setOptionValue,
  placeholder,
  disableOption,
  onChange,
  disableText = '',
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
    if (setOptionValue) setOptionValue({ key, label: value });
    setIsOpen(false);
    onChange?.(value);
  };

  function handleChangeInput(value: string) {
    setSelectedValue(value);
    if (setOptionValue)
      setOptionValue((prevState: Option) => ({
        ...prevState,
        label: value,
      }));
    onChange?.(value);
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
          <div className='relative'>
            <input
              type='text'
              value={selectedValue}
              onChange={(e) => handleChangeInput(e.target.value)}
              onClick={() => setIsOpen(!isOpen)}
              id={id}
              data-testid={id}
              placeholder={placeholder}
              className='peer block w-full rounded-md px-3 py-1.5 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6' // Added pr-8 to add padding on the right
            />
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <ArrowDownIcon
                className={`h-5 w-5 ${isOpen ? 'rotate-180 transform' : ''}`}
              />
            </span>
          </div>
          {isOpen && (
            <ul className='absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white shadow-lg '>
              {filteredOptions
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((option) => (
                  <li
                    key={option.key}
                    onClick={() => handleChangeOption(option.label, option.key)}
                    className={`cursor-pointer px-3 py-2 text-sm text-gray-900 hover:bg-gray-200 ${
                      disableOption?.(option)
                        ? 'pointer-events-none text-slate-400'
                        : ''
                    } `}
                  >
                    <span className='block'>{option.label}</span>
                    {disableText != '' && disableOption?.(option) && (
                      <span className='block text-xs'>{disableText}</span>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
