import WyeWorksLogo from '@/assets/Icons/WyeWorksLogo';

export default function Footer() {
  return (
    <footer className='border-t-2 border-gray-200 bg-white p-4'>
      <div>
        <div className='mx-5 flex items-center justify-center'>
          <span className='text-black'>Powered by</span>
          <a href='https://www.wyeworks.com/' className='mx-1' target='_blank'>
            <WyeWorksLogo />
          </a>
        </div>
      </div>
    </footer>
  );
}
