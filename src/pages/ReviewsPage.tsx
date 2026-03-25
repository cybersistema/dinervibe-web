// Full implementation in VER-15 branch. Stub wired to data hooks.
import { useParams } from 'react-router-dom'
import { useReviews } from '@/hooks/useReviews'

export default function ReviewsPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useReviews(id ?? '')

  if (isLoading) return <div className="p-8 text-gray-500">Loading reviews…</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h1>
      <p className="text-gray-500">{data?.total ?? 0} reviews. Full filter UI coming in VER-15.</p>
    </div>
  )
}
