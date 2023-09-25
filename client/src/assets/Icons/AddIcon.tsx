interface Props {
  className: string;
}

export default function AddIcon({ className }: Props) {
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
        d='M12 4v16m8-8H4'
      />
    </svg>
  );
}
