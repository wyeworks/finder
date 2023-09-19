interface Props {
  className: string;
}

export default function ArrowLeftIcon({ className }: Props) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {' '}
      <path stroke='none' d='M0 0h24v24H0z' />{' '}
      <polyline points='15 6 9 12 15 18' />
    </svg>
  );
}
