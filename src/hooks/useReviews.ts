import { useQuery } from '@tanstack/react-query'
import { reviewsApi, type ReviewFilters } from '@/api/reviews'

export const reviewKeys = {
  list: (locationId: string, filters: ReviewFilters) => ['reviews', locationId, filters] as const,
}

export function useReviews(locationId: string, filters: ReviewFilters = {}) {
  return useQuery({
    queryKey: reviewKeys.list(locationId, filters),
    queryFn: () => reviewsApi.list(locationId, filters),
    staleTime: 2 * 60_000,
    enabled: !!locationId,
  })
}
