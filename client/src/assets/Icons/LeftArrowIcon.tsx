interface Props {
  className: string;
}

export default function LeftArrowIcon({ className }: Props) {
  return (
    <svg
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M10 19l-7-7m0 0l7-7m-7 7h18'
      />
    </svg>
  );
}
