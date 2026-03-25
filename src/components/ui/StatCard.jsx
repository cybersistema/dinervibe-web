export default function StatCard({ title, value, subtitle, icon, trend, className = '' }) {
  return (
    <div
      className={`bg-cream-50 rounded-xl p-5 border border-cream-300 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-charcoal-500">{title}</p>
          <p className="mt-2 text-3xl font-display font-bold text-charcoal-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-charcoal-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`mt-2 inline-flex items-center gap-1 text-sm font-medium ${
              trend.type === 'up' ? 'text-grade-a' : trend.type === 'down' ? 'text-burgundy-900' : 'text-charcoal-500'
            }`}>
              {trend.type === 'up' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {trend.type === 'down' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {trend.value}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-lg bg-burgundy-900/5 text-burgundy-900">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
