import EyeClosedIcon from '@/assets/Icons/EyeClosedIcon';
import EyeIcon from '@/assets/Icons/EyeIcon';
import { useState } from 'react';

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
  // disabled temporary
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: React.ReactNode;
  maxWidth?: boolean;
  className?: string;
};

export default function Input({
  type,
  id,
  label,
  name,
  placeholder = '',
  required = false,
  validateText = `Por favor ingrese su ${label}`,
  touched = false,
  value,
  onChange,
  Icon,
  maxWidth = true,
  className = '',
}: InputParams) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`${maxWidth && 'max-w-sm'} justify-center`}>
      {label && (
        <label
          htmlFor={id}
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          {label}
        </label>
      )}
      <div className={`relative -mb-3 ${className}`}>
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
          id={id}
          data-testid={id}
          name={name}
          type={GetType(type, isVisible)}
          autoComplete={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`peer block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
            (Icon || type === 'password') && 'pl-10'
          }`}
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
