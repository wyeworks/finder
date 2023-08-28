type AlertProps = {
  isVisible: boolean;
  errorMessage?: string;
  type?: string;
};

export default function Alert({
  isVisible,
  errorMessage = 'Ocurrio un error inesperado, intenta de nuevo',
  type = 'alert',
}: AlertProps) {
  if (isVisible) {
    return (
      <div
        className='border-l-4 border-red-500 bg-red-100 p-4 text-red-600'
        role={type}
      >
        <p className='font-bold'>Algo salio mal</p>
        <p>{errorMessage}</p>
      </div>
    );
  }
}
