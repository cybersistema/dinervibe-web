import type { MonthlyReport } from '@/types'

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

interface ReportExportButtonProps {
  report: MonthlyReport
  locationName: string
}

export function ReportExportButton({ report, locationName }: ReportExportButtonProps) {
  function exportCSV() {
    const rows = [
      ['DinerVibe Monthly Report'],
      [`Location: ${locationName}`],
      [`Period: ${MONTHS[report.month - 1]} ${report.year}`],
      [],
      ['Metric', 'Value'],
      ['Avg Rating', report.avgRating.toFixed(2)],
      ['Review Count', report.reviewCount],
      ['Sentiment Grade', report.sentimentGrade],
      ['Positive Rate', `${(report.positiveRate * 100).toFixed(1)}%`],
      ['Trend vs Prior Month', report.trendVsPrior > 0 ? `+${report.trendVsPrior.toFixed(2)}` : report.trendVsPrior.toFixed(2)],
      [],
      ['Week', 'Review Count', 'Avg Rating'],
      ...report.weeklyBreakdown.map((w) => [`Week ${w.week}`, w.reviewCount, w.avgRating.toFixed(2)]),
      [],
      ['Sentiment', 'Count'],
      ['Positive', report.sentimentDistribution.positive],
      ['Neutral', report.sentimentDistribution.neutral],
      ['Negative', report.sentimentDistribution.negative],
    ]
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `dinervibe-report-${locationName.replace(/\s+/g, '-')}-${report.year}-${String(report.month).padStart(2, '0')}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center gap-2 print:hidden">
      <button
        onClick={exportCSV}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        ↓ Export CSV
      </button>
      <button
        onClick={() => window.print()}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        ⎙ Print
      </button>
    </div>
  )
}
