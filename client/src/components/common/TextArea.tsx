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
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({
  id,
  label,
  name,
  placeholder = '',
  required = false,
  validateText = `Por favor ingrese su ${label}`,
  touched = false,
  value,
  onChange,
}: InputParams) {
  return (
    <div className='justify-center'>
      {label && (
        <label
          htmlFor={id}
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          {label}
        </label>
      )}
      <div className='-mb-3'>
        <textarea
          id='message'
          rows={4}
          required={required}
          name={name}
          className='block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></textarea>
        {touched && (
          <p className='visible text-sm text-red-600 peer-invalid:visible'>
            {validateText}
          </p>
        )}
      </div>
    </div>
  );
}
