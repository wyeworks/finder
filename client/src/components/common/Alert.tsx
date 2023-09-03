import strings from '@/locales/strings.json';

type AlertProps = {
  isVisible: boolean;
  errorMessage?: string;
  type?: string;
};

export default function Alert({
  isVisible,
  errorMessage = strings.common.error.unexpectedError,
  type = 'alert',
}: AlertProps) {
  if (isVisible) {
    return (
      <div
        className='mt-2 h-fit content-center border-l-4 border-red-500 bg-red-100 p-3 text-sm text-red-600 '
        role={type}
      >
        <p className='font-bold'>Algo salio mal</p>
        <p>{errorMessage}</p>
      </div>
    );
  }
}
