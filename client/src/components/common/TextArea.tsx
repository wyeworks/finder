type TextAreaParams = {
  id: string;
  label?: string;
  name: string;
  touched?: boolean;
  placeholder?: string;
  required?: boolean;
  validateText?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  Icon?: React.ReactNode;
  className?: string;
  classNameWrapper?: string;
  maxWidth?: boolean;
  resize?: boolean;
};

export default function TextArea({
  id,
  label,
  name,
  touched = false,
  placeholder = '',
  required = false,
  validateText = `Por favor escribe aquí`,
  value,
  onChange,
  Icon,
  className = '',
  classNameWrapper = '',
  maxWidth = true,
  resize = false,
}: TextAreaParams) {
  return (
    <div className={`${maxWidth && 'max-w-sm'} justify-center`}>
      {label && (
        <label
          htmlFor={id}
          className='block font-poppins text-sm font-medium leading-6 text-gray-900'
        >
          {label}
        </label>
      )}
      <div className={`${classNameWrapper}`}>
        {Icon && (
          <span className='pointer-events-none absolute inset-y-0 left-0 mt-2 flex h-fit items-center pl-3'>
            {Icon}
          </span>
        )}
        <textarea
          id={id}
          name={name}
          data-testid={id}
          rows={4}
          className={`focus:ring-primaryBlue peer block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${
            Icon && 'pl-10'
          } ${className}`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          style={{ resize: resize ? undefined : 'none' }}
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
