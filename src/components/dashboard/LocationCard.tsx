import { Link } from 'react-router-dom'
import type { Location, Platform } from '@/types'
import type { DashboardView } from './ViewToggle'
import { StarRating } from '@/components/ui/StarRating'
import { TrendIndicator } from '@/components/ui/TrendIndicator'

const PLATFORM_LABELS: Record<Platform, string> = {
  google: 'G',
  yelp: 'Y',
  tripadvisor: 'TA',
  opentable: 'OT',
  other: '…',
}

const GRADE_COLORS: Record<string, string> = {
  A: 'bg-emerald-100 text-emerald-800',
  B: 'bg-blue-100 text-blue-800',
  C: 'bg-yellow-100 text-yellow-800',
  D: 'bg-orange-100 text-orange-800',
  F: 'bg-red-100 text-red-800',
}

interface LocationCardProps {
  location: Location
  view: DashboardView
}

export function LocationCard({ location, view }: LocationCardProps) {
  return (
    <Link
      to={`/locations/${location.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-indigo-200 transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-indigo-700 transition-colors">
            {location.name}
          </h3>
          <p className="text-xs text-gray-400 truncate mt-0.5">{location.address}</p>
        </div>
        {/* Platform pills */}
        <div className="flex gap-1 shrink-0">
          {location.platforms.map((p) => (
            <span
              key={p}
              className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500"
            >
              {PLATFORM_LABELS[p]}
            </span>
          ))}
        </div>
      </div>

      {/* Rating / Sentiment */}
      <div className="flex items-end justify-between">
        {view === 'stars' ? (
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-gray-900">
                {location.avgRating.toFixed(1)}
              </span>
              <TrendIndicator delta={location.trendDelta} />
            </div>
            <StarRating rating={location.avgRating} size="sm" />
          </div>
        ) : (
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span
                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-xl font-bold ${
                  GRADE_COLORS[location.sentimentGrade] ?? 'bg-gray-100 text-gray-600'
                }`}
              >
                {location.sentimentGrade}
              </span>
              <TrendIndicator delta={location.trendDelta} />
            </div>
            <span className="text-xs text-gray-500">Sentiment grade</span>
          </div>
        )}

        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">
            {location.reviewCount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">reviews</p>
        </div>
      </div>
    </Link>
  )
}
