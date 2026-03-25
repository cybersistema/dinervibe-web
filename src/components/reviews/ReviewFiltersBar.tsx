import { useState, type FormEvent } from 'react'
import type { Sentiment, Platform } from '@/types'
import type { ReviewFilters } from '@/api/reviews'

interface ReviewFiltersBarProps {
  filters: ReviewFilters
  onChange: (filters: ReviewFilters) => void
}

const SENTIMENTS: { value: Sentiment; label: string; color: string }[] = [
  { value: 'positive', label: 'Positive', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: 'neutral', label: 'Neutral', color: 'bg-yellow-50 text-yellow-700 border-yellow-300' },
  { value: 'negative', label: 'Negative', color: 'bg-red-100 text-red-700 border-red-300' },
]

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: 'google', label: 'Google' },
  { value: 'yelp', label: 'Yelp' },
  { value: 'tripadvisor', label: 'TripAdvisor' },
  { value: 'opentable', label: 'OpenTable' },
]

export function ReviewFiltersBar({ filters, onChange }: ReviewFiltersBarProps) {
  const [keywordInput, setKeywordInput] = useState(filters.keyword ?? '')

  function toggleSentiment(s: Sentiment) {
    const current = filters.sentiment ?? []
    const next = current.includes(s) ? current.filter((x) => x !== s) : [...current, s]
    onChange({ ...filters, sentiment: next.length ? next : undefined, page: 1 })
  }

  function toggleStar(r: number) {
    const current = filters.rating ?? []
    const next = current.includes(r) ? current.filter((x) => x !== r) : [...current, r]
    onChange({ ...filters, rating: next.length ? next : undefined, page: 1 })
  }

  function handleKeywordSubmit(e: FormEvent) {
    e.preventDefault()
    onChange({ ...filters, keyword: keywordInput || undefined, page: 1 })
  }

  function clearKeyword() {
    setKeywordInput('')
    onChange({ ...filters, keyword: undefined, page: 1 })
  }

  const hasFilters =
    (filters.sentiment?.length ?? 0) > 0 ||
    (filters.rating?.length ?? 0) > 0 ||
    filters.platform ||
    filters.keyword ||
    filters.dateFrom ||
    filters.dateTo

  const activeTags: { label: string; onRemove: () => void }[] = []
  filters.sentiment?.forEach((s) =>
    activeTags.push({ label: s, onRemove: () => toggleSentiment(s) })
  )
  filters.rating?.forEach((r) =>
    activeTags.push({ label: `${r}★`, onRemove: () => toggleStar(r) })
  )
  if (filters.platform)
    activeTags.push({
      label: filters.platform,
      onRemove: () => onChange({ ...filters, platform: undefined, page: 1 }),
    })
  if (filters.keyword)
    activeTags.push({ label: `"${filters.keyword}"`, onRemove: clearKeyword })
  if (filters.dateFrom || filters.dateTo)
    activeTags.push({
      label: `${filters.dateFrom ?? '…'} – ${filters.dateTo ?? '…'}`,
      onRemove: () => onChange({ ...filters, dateFrom: undefined, dateTo: undefined, page: 1 }),
    })

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
      {/* Keyword search */}
      <form onSubmit={handleKeywordSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Search reviews…"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {keywordInput && (
            <button
              type="button"
              onClick={clearKeyword}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              aria-label="Clear keyword"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap gap-4">
        {/* Sentiment */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 font-medium">Sentiment:</span>
          {SENTIMENTS.map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => toggleSentiment(value)}
              className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${
                (filters.sentiment ?? []).includes(value)
                  ? color + ' shadow-sm'
                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 font-medium">Rating:</span>
          {[5, 4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => toggleStar(r)}
              className={`text-xs px-2 py-1 rounded-md border font-medium transition-all ${
                (filters.rating ?? []).includes(r)
                  ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-sm'
                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {r}★
            </button>
          ))}
        </div>

        {/* Platform */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 font-medium">Platform:</span>
          <select
            value={filters.platform ?? ''}
            onChange={(e) =>
              onChange({
                ...filters,
                platform: (e.target.value as Platform) || undefined,
                page: 1,
              })
            }
            className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            {PLATFORMS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Date range */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 font-medium">From:</span>
          <input
            type="date"
            value={filters.dateFrom ?? ''}
            onChange={(e) => onChange({ ...filters, dateFrom: e.target.value || undefined, page: 1 })}
            className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-xs text-gray-500">To:</span>
          <input
            type="date"
            value={filters.dateTo ?? ''}
            onChange={(e) => onChange({ ...filters, dateTo: e.target.value || undefined, page: 1 })}
            className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Active filter tags */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-gray-400">Active:</span>
          {activeTags.map(({ label, onRemove }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 rounded-full px-2 py-0.5"
            >
              {label}
              <button onClick={onRemove} className="hover:text-indigo-900" aria-label={`Remove ${label} filter`}>✕</button>
            </span>
          ))}
          {hasFilters && (
            <button
              onClick={() => {
                setKeywordInput('')
                onChange({ page: 1 })
              }}
              className="text-xs text-gray-400 hover:text-gray-700 underline ml-1"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  )
}
