import LeftArrowIcon from '@/assets/Icons/LeftArrowIcon';

type LayoutFormsProps = {
  className?: string;
  backPage: () => void;
  children: React.ReactNode;
};

export default function LayoutForms({
  className = '',
  backPage,
  children,
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
