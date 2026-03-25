import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useReviews } from '@/hooks/useReviews'
import { useLocation } from '@/hooks/useLocations'
import type { ReviewFilters } from '@/api/reviews'
import { ReviewFiltersBar } from '@/components/reviews/ReviewFiltersBar'
import { ReviewCard } from '@/components/reviews/ReviewCard'
import { Pagination } from '@/components/reviews/Pagination'

const PAGE_SIZE = 10

type SortOption = ReviewFilters['sortBy']

export default function ReviewsPage() {
  const { id } = useParams<{ id: string }>()
  const locationId = id ?? ''

  const { data: location } = useLocation(locationId)
  const [filters, setFilters] = useState<ReviewFilters>({ page: 1, pageSize: PAGE_SIZE })
  const [sort, setSort] = useState<SortOption>('date_desc')

  const { data, isLoading, isError } = useReviews(locationId, { ...filters, sortBy: sort })

  function handleFiltersChange(next: ReviewFilters) {
    setFilters(next)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-gray-400 mb-1">
            <Link to="/" className="hover:text-gray-700">Dashboard</Link>
            {location && (
              <>
                {' / '}
                <Link to={`/locations/${locationId}`} className="hover:text-gray-700">
                  {location.name}
                </Link>
              </>
            )}
            {' / '}
            <span className="text-gray-600">Reviews</span>
          </nav>
          <h1 className="text-xl font-bold text-gray-900">
            {location ? `${location.name} — Reviews` : 'Reviews'}
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6 space-y-4">
        <ReviewFiltersBar filters={filters} onChange={handleFiltersChange} />

        {/* Sort bar */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {isLoading ? 'Loading…' : isError ? '' : `${data?.total ?? 0} reviews`}
          </p>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Sort:</label>
            <select
              value={sort ?? 'date_desc'}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="date_desc">Newest first</option>
              <option value="date_asc">Oldest first</option>
              <option value="rating_desc">Highest rating</option>
              <option value="rating_asc">Lowest rating</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-600">Failed to load reviews.</div>
        ) : data && data.reviews.length > 0 ? (
          <>
            <div className="space-y-3">
              {data.reviews.map((r) => (
                <ReviewCard key={r.id} review={r} keyword={filters.keyword} />
              ))}
            </div>
            <Pagination
              page={data.page}
              total={data.total}
              pageSize={data.pageSize}
              onChange={(p) => setFilters((f) => ({ ...f, page: p }))}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">No reviews match your filters.</p>
            <button
              onClick={() => setFilters({ page: 1, pageSize: PAGE_SIZE })}
              className="text-sm text-indigo-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
