interface Props {
  className: string;
}

export default function ArrowRightIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {' '}
      <polyline points='9 18 15 12 9 6' />
    </svg>
  );
}
