import { Button } from '@/components/ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showEllipsisStart = currentPage > 3;
  const showEllipsisEnd = currentPage < totalPages - 2;

  const visiblePages = pages.filter(page => {
    if (page === 1 || page === totalPages) return true;
    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
    return false;
  });

  return (
    <nav className="flex justify-center items-center gap-2 mt-8" aria-label="Pagination">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Button>

      {showEllipsisStart && (
        <>
          <Button
            variant={currentPage === 1 ? 'primary' : 'outline'}
            onClick={() => onPageChange(1)}
          >
            1
          </Button>
          <span className="px-2 text-gray-500">...</span>
        </>
      )}

      {visiblePages.map(page => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'outline'}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}

      {showEllipsisEnd && (
        <>
          <span className="px-2 text-gray-500">...</span>
          <Button
            variant={currentPage === totalPages ? 'primary' : 'outline'}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </nav>
  );
}
