import { useState } from 'react'
import { useLocations } from '@/hooks/useLocations'
import type { Location } from '@/types'
import { ViewToggle, type DashboardView } from '@/components/dashboard/ViewToggle'
import { LocationCard } from '@/components/dashboard/LocationCard'
import { DashboardSummary } from '@/components/dashboard/DashboardSummary'
import { useAuth } from '@/auth/AuthContext'

type SortOption = 'rating_desc' | 'rating_asc' | 'reviews_desc' | 'name_asc'

function sortLocations(locations: Location[], sort: SortOption): Location[] {
  const copy = [...locations]
  switch (sort) {
    case 'rating_desc': return copy.sort((a, b) => b.avgRating - a.avgRating)
    case 'rating_asc': return copy.sort((a, b) => a.avgRating - b.avgRating)
    case 'reviews_desc': return copy.sort((a, b) => b.reviewCount - a.reviewCount)
    case 'name_asc': return copy.sort((a, b) => a.name.localeCompare(b.name))
  }
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-1/3" />
    </div>
  )
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { data: locations = [], isLoading, isError } = useLocations()
  const [view, setView] = useState<DashboardView>('stars')
  const [sort, setSort] = useState<SortOption>('rating_desc')

  const sorted = sortLocations(locations, sort)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">DinerVibe</h1>
            <p className="text-xs text-gray-400">Review Intelligence Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium capitalize">
              {user?.role}
            </span>
            <button
              onClick={logout}
              className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Summary stats */}
        {!isLoading && !isError && <DashboardSummary locations={locations} />}

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <ViewToggle value={view} onChange={setView} />
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Sort:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="rating_desc">Highest rated</option>
              <option value="rating_asc">Lowest rated</option>
              <option value="reviews_desc">Most reviewed</option>
              <option value="name_asc">A–Z</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : isError ? (
          <div className="text-center py-16 text-red-600">Failed to load locations. Please refresh.</div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No locations found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((loc) => (
              <LocationCard key={loc.id} location={loc} view={view} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
