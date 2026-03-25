import type { Location } from '@/types'

interface DashboardSummaryProps {
  locations: Location[]
}

export function DashboardSummary({ locations }: DashboardSummaryProps) {
  const totalReviews = locations.reduce((sum, l) => sum + l.reviewCount, 0)
  const avgRating =
    locations.length > 0
      ? locations.reduce((sum, l) => sum + l.avgRating, 0) / locations.length
      : 0
  const topLocation = [...locations].sort((a, b) => b.avgRating - a.avgRating)[0]

  const stats = [
    { label: 'Locations', value: locations.length },
    { label: 'Total Reviews', value: totalReviews.toLocaleString() },
    { label: 'Network Avg Rating', value: avgRating.toFixed(2) },
    { label: 'Top Rated', value: topLocation?.name ?? '—' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map(({ label, value }) => (
        <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
          <p className="mt-1 text-lg font-bold text-gray-900 truncate">{value}</p>
        </div>
      ))}
    </div>
  )
}
