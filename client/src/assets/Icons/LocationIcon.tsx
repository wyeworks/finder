interface Props {
  className: string;
}

export default function LocationIcon({ className }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='29'
      height='30'
      viewBox='0 0 29 30'
      fill='none'
      className={className}
    >
      <path
        d='M18.0726 13.1682C18.0726 15.1835 16.4543 16.8172 14.458 16.8172C12.4618 16.8172 10.8435 15.1835 10.8435 13.1682C10.8435 11.153 12.4618 9.51931 14.458 9.51931C16.4543 9.51931 18.0726 11.153 18.0726 13.1682Z'
        stroke='#212B36'
        strokeWidth='2.58077'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23.4943 13.1682C23.4943 21.8553 14.458 26.8518 14.458 26.8518C14.458 26.8518 5.42175 21.8553 5.42175 13.1682C5.42175 8.13011 9.46744 4.0459 14.458 4.0459C19.4486 4.0459 23.4943 8.13011 23.4943 13.1682Z'
        stroke='#212B36'
        strokeWidth='2.58077'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
