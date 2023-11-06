import Image from 'next/image';
import EmptyBoxImage from '@/assets/images/empty_box.png';
import React from 'react';

export default function Empty(props: { text: string }) {
  return (
    <div
      data-testid='emptyGroups'
      className='flex h-[500px] flex-col items-center justify-center'
    >
      <Image src={EmptyBoxImage} alt='Caja vacia' />
      <p className='mt-4'>{props.text}</p>
    </div>
  );
}
