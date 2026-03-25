export type DashboardView = 'stars' | 'sentiment'

interface ViewToggleProps {
  value: DashboardView
  onChange: (view: DashboardView) => void
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div
      role="group"
      aria-label="Display mode"
      className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5"
    >
      {(['stars', 'sentiment'] as DashboardView[]).map((view) => (
        <button
          key={view}
          role="radio"
          aria-checked={value === view}
          onClick={() => onChange(view)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            value === view
              ? 'bg-white shadow-sm text-indigo-700 border border-gray-200'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {view === 'stars' ? '★ Star Rating' : 'A–F Sentiment'}
        </button>
      ))}
    </div>
  )
}
