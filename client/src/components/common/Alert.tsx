import strings from '@/locales/strings.json';

type AlertProps = {
  isVisible: boolean;
  id?: string;
  errorMessage?: string;
  title?: string;
  type?: string;
};

export default function Alert({
  isVisible,
  title = strings.common.error.defaultError,
  errorMessage = strings.common.error.unexpectedError,
  type = 'alert',
  id = 'alert',
}: AlertProps) {
  if (isVisible) {
    return (
      <div
        data-testid={id}
        className='mt-2 h-20 h-fit content-center overflow-auto border-l-4 border-red-500 bg-red-100 p-3 text-sm text-red-600'
        role={type}
      >
        <p className='font-bold'>{title}</p>
        <p>{errorMessage}</p>
      </div>
    );
  }
}
