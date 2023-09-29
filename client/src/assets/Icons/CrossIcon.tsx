interface Props {
  className: string;
}

export default function CrossIcon({ className }: Props) {
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
      <line x1='18' y1='6' x2='6' y2='18' />{' '}
      <line x1='6' y1='6' x2='18' y2='18' />
    </svg>
  );
}
