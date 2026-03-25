// Full implementation in VER-14 branch. Stub wired to data hooks.
import { useLocations } from '@/hooks/useLocations'

export default function DashboardPage() {
  const { data: locations, isLoading, isError } = useLocations()

  if (isLoading) return <div className="p-8 text-gray-500">Loading locations…</div>
  if (isError) return <div className="p-8 text-red-600">Failed to load locations.</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <p className="text-gray-500">{locations?.length ?? 0} locations loaded. Full UI coming in VER-14.</p>
    </div>
  )
}
