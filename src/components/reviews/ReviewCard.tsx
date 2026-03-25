import type { Review } from '@/types'
import { StarRating } from '@/components/ui/StarRating'

const SENTIMENT_COLORS = {
  positive: 'bg-emerald-100 text-emerald-700',
  neutral: 'bg-yellow-50 text-yellow-700',
  negative: 'bg-red-100 text-red-700',
}

const PLATFORM_LABELS: Record<string, string> = {
  google: 'Google',
  yelp: 'Yelp',
  tripadvisor: 'TripAdvisor',
  opentable: 'OpenTable',
  other: 'Other',
}

interface ReviewCardProps {
  review: Review
  keyword?: string
}

function highlight(text: string, keyword: string): React.ReactNode {
  if (!keyword) return text
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export function ReviewCard({ review, keyword }: ReviewCardProps) {
  const date = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{review.authorName}</span>
          <StarRating rating={review.rating} size="sm" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${SENTIMENT_COLORS[review.sentiment]}`}
          >
            {review.sentiment}
          </span>
          <span className="text-xs text-gray-400">{PLATFORM_LABELS[review.platform]}</span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">
        {keyword ? highlight(review.text, keyword) : review.text}
      </p>
      {review.ownerReply && (
        <div className="mt-3 ml-4 pl-3 border-l-2 border-indigo-200">
          <p className="text-xs text-gray-400 font-medium mb-0.5">Owner reply</p>
          <p className="text-sm text-gray-600 italic">{review.ownerReply}</p>
        </div>
      )}
    </div>
  )
}
