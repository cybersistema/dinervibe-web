import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMonthlyReport } from '@/hooks/useMonthlyReport'
import { useLocation } from '@/hooks/useLocations'
import { MonthPicker } from '@/components/reports/MonthPicker'
import { ReportStatCards } from '@/components/reports/ReportStatCards'
import { RatingTrendChart } from '@/components/reports/RatingTrendChart'
import { SentimentDonutChart } from '@/components/reports/SentimentDonutChart'
import { ReportExportButton } from '@/components/reports/ReportExportButton'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function ReportsPage() {
  const { id } = useParams<{ id: string }>()
  const locationId = id ?? ''
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)

  const { data: location } = useLocation(locationId)
  const { data: report, isLoading, isError } = useMonthlyReport(locationId, year, month)

  function handleMonthChange(y: number, m: number) {
    setYear(y)
    setMonth(m)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 print:hidden">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-gray-400 mb-1">
            <Link to="/" className="hover:text-gray-700">Dashboard</Link>
            {location && (
              <>
                {' / '}
                <Link to={`/locations/${locationId}`} className="hover:text-gray-700">
                  {location.name}
                </Link>
              </>
            )}
            {' / '}
            <span className="text-gray-600">Monthly Reports</span>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-bold text-gray-900">
              {location?.name ?? 'Monthly Report'}
            </h1>
            <div className="flex items-center gap-3">
              <MonthPicker year={year} month={month} onChange={handleMonthChange} />
              {report && location && (
                <ReportExportButton report={report} locationName={location.name} />
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        {/* Print header */}
        <div className="hidden print:block mb-4">
          <h1 className="text-2xl font-bold">{location?.name} — Monthly Report</h1>
          <p className="text-gray-600">{MONTHS[month - 1]} {year}</p>
        </div>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 h-20" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4 h-48" />
              <div className="bg-white rounded-xl border border-gray-200 p-4 h-48" />
            </div>
          </div>
        ) : isError || !report ? (
          <div className="text-center py-12 text-red-600">Failed to load report.</div>
        ) : (
          <>
            <ReportStatCards report={report} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RatingTrendChart weeks={report.weeklyBreakdown} />
              <SentimentDonutChart distribution={report.sentimentDistribution} />
            </div>

            {/* Print footer */}
            <div className="hidden print:block text-xs text-gray-400 mt-8 pt-4 border-t border-gray-200">
              DinerVibe — {MONTHS[month - 1]} {year} Report for {location?.name}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
