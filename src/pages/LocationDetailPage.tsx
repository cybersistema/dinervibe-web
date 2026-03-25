import { useParams, Link } from 'react-router-dom'
import { useLocation } from '@/hooks/useLocations'

export default function LocationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: location, isLoading, isError } = useLocation(id ?? '')

  if (isLoading) return <div className="p-8 text-gray-500">Loading…</div>
  if (isError || !location) return <div className="p-8 text-red-600">Location not found.</div>

  return (
    <div className="p-8">
      <Link to="/" className="text-indigo-600 hover:underline text-sm">← Dashboard</Link>
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">{location.name}</h1>
      <p className="text-gray-500 mb-4">{location.address}</p>
      <div className="flex gap-4">
        <Link to={`/locations/${id}/reviews`} className="text-indigo-600 hover:underline text-sm">View Reviews</Link>
        <Link to={`/locations/${id}/reports`} className="text-indigo-600 hover:underline text-sm">Monthly Reports</Link>
      </div>
    </div>
  )
}
