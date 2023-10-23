type ButtonParams = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  text?: string;
  className?: string;
  onClick?: () => void;
  id?: string;
  classNameWrapper?: string;
  disabled?: boolean;
  Icon?: React.ReactNode;
  spaceBetween?: number;
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
  spaceBetween = 0,
}: ButtonParams) {
  return (
    <div className={`${classNameWrapper}`}>
      <button
        id={id}
        data-testid={id}
        type={type}
        className={`flex w-full justify-center rounded-md bg-primaryBlue px-3 py-3 font-poppins text-sm font-semibold  leading-6
             text-white shadow-sm hover:bg-primaryBlue-400 focus:outline-none focus:ring focus:ring-blue-200
             disabled:bg-disabledGray ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {Icon && <>{Icon}</>}
        {spaceBetween > 0 && <div style={{ width: `${spaceBetween}px` }} />}
        {text}
      </button>
    </div>
  );
}
