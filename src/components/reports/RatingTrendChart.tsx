import type { WeeklyBreakdown } from '@/types'

interface RatingTrendChartProps {
  weeks: WeeklyBreakdown[]
}

function ratingColor(rating: number): string {
  if (rating >= 4.5) return '#10b981'
  if (rating >= 4.0) return '#34d399'
  if (rating >= 3.5) return '#fbbf24'
  if (rating >= 3.0) return '#f97316'
  return '#ef4444'
}

export function RatingTrendChart({ weeks }: RatingTrendChartProps) {
  const maxCount = Math.max(...weeks.map((w) => w.reviewCount), 1)
  const chartH = 120
  const barW = 48

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Weekly Rating Trend</h3>
      <svg
        viewBox={`0 0 ${weeks.length * (barW + 12)} ${chartH + 40}`}
        className="w-full"
        aria-label="Weekly rating trend chart"
      >
        {weeks.map((w, i) => {
          const barH = Math.max(8, (w.reviewCount / maxCount) * chartH)
          const x = i * (barW + 12)
          const y = chartH - barH
          return (
            <g key={w.week}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx={4}
                fill={ratingColor(w.avgRating)}
                opacity={0.85}
              />
              <text
                x={x + barW / 2}
                y={y - 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill="#374151"
              >
                {w.avgRating.toFixed(1)}
              </text>
              <text
                x={x + barW / 2}
                y={chartH + 16}
                textAnchor="middle"
                fontSize={10}
                fill="#9ca3af"
              >
                Wk {w.week}
              </text>
              <text
                x={x + barW / 2}
                y={chartH + 30}
                textAnchor="middle"
                fontSize={10}
                fill="#d1d5db"
              >
                ({w.reviewCount})
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
