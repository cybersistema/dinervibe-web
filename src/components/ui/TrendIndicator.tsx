interface TrendIndicatorProps {
  delta: number // positive = up, negative = down, 0 = flat
}

export function TrendIndicator({ delta }: TrendIndicatorProps) {
  if (delta === 0) {
    return <span className="text-xs text-gray-400 font-medium">—</span>
  }
  const isUp = delta > 0
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
        isUp ? 'text-emerald-600' : 'text-red-500'
      }`}
    >
      {isUp ? '↑' : '↓'}
      {Math.abs(delta).toFixed(1)}
    </span>
  )
}
