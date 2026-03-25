import type { MonthlyReport } from '@/types'
import { TrendIndicator } from '@/components/ui/TrendIndicator'

const GRADE_COLORS: Record<string, string> = {
  A: 'text-emerald-700 bg-emerald-50',
  B: 'text-blue-700 bg-blue-50',
  C: 'text-yellow-700 bg-yellow-50',
  D: 'text-orange-700 bg-orange-50',
  F: 'text-red-700 bg-red-50',
}

interface ReportStatCardsProps {
  report: MonthlyReport
}

export function ReportStatCards({ report }: ReportStatCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Avg Rating</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{report.avgRating.toFixed(1)}</span>
          <TrendIndicator delta={report.trendVsPrior} />
        </div>
        <p className="text-xs text-gray-400 mt-1">out of 5.0</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Reviews</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{report.reviewCount}</span>
          <TrendIndicator delta={report.trendVsPrior} />
        </div>
        <p className="text-xs text-gray-400 mt-1">this month</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Sentiment Grade</p>
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-xl font-bold ${
            GRADE_COLORS[report.sentimentGrade] ?? 'bg-gray-100 text-gray-600'
          }`}
        >
          {report.sentimentGrade}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Positive Rate</p>
        <span className="text-2xl font-bold text-gray-900">
          {(report.positiveRate * 100).toFixed(0)}%
        </span>
        <p className="text-xs text-gray-400 mt-1">of reviews</p>
      </div>
    </div>
  )
}
