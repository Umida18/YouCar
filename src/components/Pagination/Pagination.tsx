interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 2) {
      end = maxVisiblePages - 1;
    }
    if (currentPage >= totalPages - 1) {
      start = totalPages - (maxVisiblePages - 1);
    }

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2">
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`
          h-10 w-10 rounded-full
          ${
            page === currentPage
              ? "bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
              : ""
          }
          ${page === "..." ? "cursor-default hover:bg-transparent" : ""}
        `}
          disabled={page === "..."}
          onClick={() => typeof page === "number" && onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
