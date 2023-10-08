type PaginationProps = {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) {
  const getDisplayedPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage > totalPages - 3) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  return (
    <div className='flex items-center justify-center space-x-2 rounded bg-white p-2 shadow-lg'>
      <button
        className='rounded p-1 hover:bg-gray-200'
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        &lt;
      </button>

      {getDisplayedPages().map((page) => (
        <span
          key={page}
          className={`p-1 ${
            currentPage === page
              ? 'bg-gray-100 text-sky-500'
              : 'hover:bg-gray-200'
          } cursor-pointer rounded`}
          onClick={() => onChange(page)}
        >
          {page}
        </span>
      ))}

      {totalPages > 5 && currentPage < totalPages - 3 && (
        <span className='px-2'>...</span>
      )}

      {totalPages > 5 && currentPage < totalPages - 2 && (
        <span
          className='cursor-pointer rounded p-1 hover:bg-gray-200'
          onClick={() => onChange(totalPages)}
        >
          {totalPages}
        </span>
      )}

      <button
        className='rounded p-1 hover:bg-gray-200'
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
