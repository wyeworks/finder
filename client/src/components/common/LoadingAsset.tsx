import Image from 'next/image';

export default function LoadingAsset({ message }: { message: string }) {
  return (
    <>
      <Image
        src='/loading_groups.png'
        alt='Banner'
        width={100}
        height={100}
        className='animate-bounce object-cover'
      />
      <p className='mt-4'>{message}</p>
    </>
  );
}
