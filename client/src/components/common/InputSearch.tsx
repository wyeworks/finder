import SearchIcon from '@/assets/Icons/SearchIcon';
import strings from '@/locales/strings.json';

export default function InputSearch() {
  return (
    <div className='relative'>
      <input
        type='search'
        placeholder={strings.common.SearchInput.placeholder}
        className='h-12 w-full rounded-[10px] bg-white p-4'
      />
      <button className='absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white'>
        <SearchIcon className='h-8 w-8 text-inputTextColor' />
      </button>
    </div>
  );
}
