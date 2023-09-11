import strings from '@/locales/strings.json';

type AlertProps = {
  isVisible: boolean;
  successMessage?: string;
  type?: string;
};

export default function AlertSuccess({
  isVisible,
  successMessage = strings.common.success.requestOk,
  type = 'success',
}: AlertProps) {
  if (isVisible) {
    return (
      <div
        className='mt-2 h-fit content-center border-l-4 border-green-500 bg-green-100 p-3 text-sm text-green-600 '
        role={type}
      >
        <p className='font-bold'>¡Exito!</p>
        <p>{successMessage}</p>
      </div>
    );
  }
}
