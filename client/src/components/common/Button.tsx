type ButtonParams = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  text?: string;
  className?: string;
  onClick?: () => void;
  id?: string;
  classNameWrapper?: string;
  disabled?: boolean;
  Icon?: React.ReactNode;
};

export default function Button({
  type = 'button',
  text = '',
  className = '',
  onClick,
  id,
  classNameWrapper = '',
  disabled = false,
  Icon,
}: ButtonParams) {
  return (
    <div className={`${classNameWrapper}`}>
      <button
        id={id}
        type={type}
        className={`flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold leading-6
             text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 
             focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-400 ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {Icon && <>{Icon}</>}

        {text}
      </button>
    </div>
  );
}
