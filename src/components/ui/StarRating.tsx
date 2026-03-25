interface StarRatingProps {
  rating: number // 0-5, supports decimals
  size?: 'sm' | 'md' | 'lg'
}

const SIZE = { sm: 'w-3.5 h-3.5', md: 'w-5 h-5', lg: 'w-6 h-6' }

export function StarRating({ rating, size = 'md' }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i))
        return (
          <svg
            key={i}
            className={SIZE[size]}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`star-${i}-${rating}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${fill * 100}%`} stopColor="#FBBF24" />
                <stop offset={`${fill * 100}%`} stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path
              d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
              fill={`url(#star-${i}-${rating})`}
              stroke="#FBBF24"
              strokeWidth="0.5"
            />
          </svg>
        )
      })}
    </div>
  )
}
