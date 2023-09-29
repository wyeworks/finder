import LeftArrowIcon from '@/assets/Icons/LeftArrowIcon';

type LayoutFormsProps = {
  children: React.ReactNode;
  className?: string;
  backPage: () => void;
};

export default function LayoutForms({
  children,
  className = '',
  backPage,
}: LayoutFormsProps) {
  return (
    <div className={className}>
      <button
        className='flex items-center gap-3 text-start'
        onClick={() => {
          backPage();
        }}
      >
        <LeftArrowIcon className='h-4 w-4' /> Volver
      </button>
      {children}
    </div>
  );
}
