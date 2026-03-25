import type { SentimentDistribution } from '@/types'

interface SentimentDonutChartProps {
  distribution: SentimentDistribution
}

const SEGMENTS = [
  { key: 'positive', label: 'Positive', color: '#10b981' },
  { key: 'neutral', label: 'Neutral', color: '#fbbf24' },
  { key: 'negative', label: 'Negative', color: '#f87171' },
] as const

function polarToXY(angle: number, r: number, cx: number, cy: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(startAngle: number, endAngle: number, r: number, ri: number, cx: number, cy: number) {
  const start = polarToXY(startAngle, r, cx, cy)
  const end = polarToXY(endAngle, r, cx, cy)
  const iStart = polarToXY(startAngle, ri, cx, cy)
  const iEnd = polarToXY(endAngle, ri, cx, cy)
  const large = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y} L ${iEnd.x} ${iEnd.y} A ${ri} ${ri} 0 ${large} 0 ${iStart.x} ${iStart.y} Z`
}

export function SentimentDonutChart({ distribution }: SentimentDonutChartProps) {
  const total = distribution.positive + distribution.neutral + distribution.negative || 1
  const cx = 90, cy = 90, r = 75, ri = 45

  let angle = 0
  const arcs = SEGMENTS.map(({ key, label, color }) => {
    const value = distribution[key]
    const sweep = (value / total) * 360
    const path = arcPath(angle, angle + sweep - 0.5, r, ri, cx, cy)
    angle += sweep
    return { key, label, color, value, pct: ((value / total) * 100).toFixed(0), path }
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Sentiment Distribution</h3>
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 180 180" className="w-36 h-36 shrink-0" aria-label="Sentiment donut chart">
          {arcs.map(({ key, color, path }) => (
            <path key={key} d={path} fill={color} />
          ))}
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize={11} fill="#6b7280">total</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize={18} fontWeight={700} fill="#111827">
            {total}
          </text>
        </svg>
        <div className="space-y-2">
          {arcs.map(({ key, label, color, value, pct }) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-sm text-gray-700">{label}</span>
              <span className="text-sm font-semibold text-gray-900 ml-auto">{pct}%</span>
              <span className="text-xs text-gray-400">({value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
