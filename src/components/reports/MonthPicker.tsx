const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

interface MonthPickerProps {
  year: number
  month: number // 1-12
  onChange: (year: number, month: number) => void
}

export function MonthPicker({ year, month, onChange }: MonthPickerProps) {
  const now = new Date()
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1

  function prev() {
    if (month === 1) onChange(year - 1, 12)
    else onChange(year, month - 1)
  }

  function next() {
    if (isCurrentMonth) return
    if (month === 12) onChange(year + 1, 1)
    else onChange(year, month + 1)
  }

  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - i)

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={prev}
        className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
        aria-label="Previous month"
      >
        ‹
      </button>
      <div className="flex items-center gap-1.5">
        <select
          value={month}
          onChange={(e) => onChange(year, parseInt(e.target.value))}
          className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {MONTHS.map((name, i) => (
            <option
              key={i}
              value={i + 1}
              disabled={year === now.getFullYear() && i + 1 > now.getMonth() + 1}
            >
              {name}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => {
            const y = parseInt(e.target.value)
            const m = y === now.getFullYear() ? Math.min(month, now.getMonth() + 1) : month
            onChange(y, m)
          }}
          className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <button
        onClick={next}
        disabled={isCurrentMonth}
        className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
        aria-label="Next month"
      >
        ›
      </button>
    </div>
  )
}
