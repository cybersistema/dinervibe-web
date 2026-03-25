// Full implementation in VER-16 branch. Stub wired to data hooks.
import { useParams } from 'react-router-dom'
import { useMonthlyReport } from '@/hooks/useMonthlyReport'

export default function ReportsPage() {
  const { id } = useParams<{ id: string }>()
  const now = new Date()
  const { data, isLoading } = useMonthlyReport(id ?? '', now.getFullYear(), now.getMonth() + 1)

  if (isLoading) return <div className="p-8 text-gray-500">Loading report…</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Monthly Report</h1>
      <p className="text-gray-500">Avg rating: {data?.avgRating}. Full charts coming in VER-16.</p>
    </div>
  )
}
