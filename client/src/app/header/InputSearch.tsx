export default function InputSearch() {
  return (
    <div className='relative'>
      <input
        type='search'
        placeholder='Búsqueda...'
        className='h-12 w-full rounded-[10px] bg-white p-4'
        // onChange={(e) => handleSearch(e)}
      />
      <button className='absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white'>
        <svg
          className='h-8 w-8 text-inputTextColor'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          {' '}
          <circle cx='11' cy='11' r='8' />{' '}
          <line x1='21' y1='21' x2='16.65' y2='16.65' />
        </svg>
      </button>
    </div>
  );
}
