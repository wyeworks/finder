import { Fragment, useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import ArrowDownIcon from '@/assets/Icons/ArrowDownIcon';
import { Option } from '@/types/Option';
import { removeAccents } from '@/utils/Formatter';

interface AutoCompleteProps {
  options?: Option[];
  // eslint-disable-next-line no-unused-vars
  disableOption?: (option: Option) => boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (option: Option) => void;
  value?: Option;
  disabledText?: string;
  placeholder?: string;
}

export default function AutoComplete({
  options = [],
  disableOption,
  onChange,
  value = {
    key: '',
    label: '',
  },
  disabledText = '',
  placeholder = '',
}: AutoCompleteProps) {
  const [selectedOption, setSelectedOption] = useState<Option>(value);
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return removeAccents(option.label.toLowerCase()).includes(
            query.toLowerCase()
          );
        });

  useEffect(() => {
    onChange?.({ key: selectedOption?.key, label: selectedOption?.label });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return (
    <div className='relative h-full'>
      <Combobox value={selectedOption} onChange={setSelectedOption} nullable>
        {/* <div> */}
        <div className='relative h-full w-full cursor-default overflow-hidden rounded-lg border border-gray-300 text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
          <Combobox.Input
            className='relative h-full w-full border-none bg-backgroundInput py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
            displayValue={(option: Option) => option?.label}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder={placeholder}
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <ArrowDownIcon className='h-5 w-5' />
          </Combobox.Button>
        </div>

        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-backgroundInput py-1 text-base shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredOptions.length === 0 && query !== '' ? (
              <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                No hay resultados encontrados
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.key}
                  value={option}
                  className={({ active, disabled }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-400 text-white' : 'text-gray-900'
                    }
                  ${disabled ? 'text-slate-400' : 'text-gray-900'}`
                  }
                  disabled={disableOption?.(option)}
                >
                  {({ selected, active, disabled }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {disabled && (
                        <span className='block text-xs'>{disabledText}</span>
                      )}
                      {selected && (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        ></span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
}
