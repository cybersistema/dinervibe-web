interface PaginationProps {
  page: number
  total: number
  pageSize: number
  onChange: (page: number) => void
}

export function Pagination({ page, total, pageSize, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null

  function pages(): (number | '…')[] {
    const result: (number | '…')[] = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        result.push(i)
      } else if (result[result.length - 1] !== '…') {
        result.push('…')
      }
    }
    return result
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages().map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              p === page
                ? 'bg-indigo-600 border-indigo-600 text-white font-medium'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  )
}
