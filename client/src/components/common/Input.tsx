import EyeClosedIcon from '@/assets/Icons/EyeClosedIcon';
import EyeIcon from '@/assets/Icons/EyeIcon';
import { useState } from 'react';
import TooltipIcon from '@/components/common/TooltipIcon';
import InfoIcon from '@/assets/Icons/InfoIcon';

type InputParams = {
  type: string;
  id: string;
  label?: string;
  name: string;
  touched?: boolean;
  placeholder?: string;
  required?: boolean;
  validateText?: string;
  value?: string;
  fieldInfo?: string;
  // disabled temporary
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  Icon?: React.ReactNode;
  pattern?: string;
  maxWidth?: boolean;
  classNameWrapper?: string;
  classNameInput?: string;
  minNumber?: string | number;
  max?: string | number;
  classNameLabel?: string;
  classNameAll?: string;
  autoComplete?: string;
  disabled?: boolean;
  maxLength?: number;
  newClassNameInput?: string;
};

export default function Input({
  type,
  id,
  label,
  fieldInfo,
  name,
  placeholder = '',
  required = false,
  validateText = `Por favor ingrese su ${label}`,
  touched = false,
  value,
  onChange,
  Icon,
  pattern,
  maxWidth = true,
  classNameWrapper = '',
  classNameInput = '',
  classNameAll = '',
  minNumber,
  max,
  classNameLabel = '',
  autoComplete = type,
  disabled = false,
  onBlur,
  onFocus,
  maxLength,
  newClassNameInput,
}: InputParams) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  function renderLabelAndInfo() {
    if (label || fieldInfo) {
      return (
        //If No label, then fieldInfo will be to the end
        <div className='flex items-center'>
          {label && (
            <label
              htmlFor={id}
              className={`flex-1 font-poppins text-sm font-medium leading-6 text-blackTextColor ${classNameLabel}`}
            >
              {label}
            </label>
          )}
          {fieldInfo && (
            <TooltipIcon tooltipText={fieldInfo} tooltipPosition={'left'}>
              <InfoIcon width={13} height={13} />
            </TooltipIcon>
          )}
        </div>
      );
    }
  }

  function getClassName() {
    if (newClassNameInput) return newClassNameInput;
    return `focus:ring-primaryBlue peer block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 
      shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 
      focus:ring-inset sm:text-sm sm:leading-6 ${
        (Icon || type === 'password') && 'pl-10'
      } ${classNameInput}`;
  }

  return (
    <div className={`${maxWidth && 'max-w'} justify-center ${classNameAll}`}>
      {renderLabelAndInfo()}
      <div className={`relative -mb-3 ${classNameWrapper}`}>
        {Icon && (
          <span className='pointer-events-none absolute inset-y-0 left-0 mt-2 flex h-fit items-center pl-3'>
            {Icon}
          </span>
        )}

        {!Icon && type === 'password' && (
          <VisibilityToggleButton
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
          />
        )}

        <input
          pattern={pattern}
          id={id}
          data-testid={id}
          name={name}
          type={GetType(type, isVisible)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={getClassName()}
          min={minNumber}
          max={max}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          maxLength={maxLength}
        />
        {touched && (
          <p className='invisible text-sm text-red-600 peer-invalid:visible'>
            {validateText}
          </p>
        )}
      </div>
    </div>
  );
}

type VisibilityToggleButtonProps = {
  isVisible: boolean;
  toggleVisibility: () => void;
};

function VisibilityToggleButton({
  isVisible,
  toggleVisibility,
}: VisibilityToggleButtonProps) {
  return (
    <button
      type='button'
      data-testid='visibility-toggle-button'
      className='absolute inset-y-0 left-0 mt-2 flex h-fit items-center pl-3'
      onClick={toggleVisibility}
    >
      {isVisible ? (
        <EyeClosedIcon className='h-5 w-5 text-gray-400' />
      ) : (
        <EyeIcon className='h-5 w-5 text-gray-400' />
      )}
    </button>
  );
}

function GetType(type: string, isVisible: boolean) {
  return type === 'password' ? (isVisible ? 'text' : 'password') : type;
}
