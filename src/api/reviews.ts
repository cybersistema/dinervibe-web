import type { Review, Sentiment, Platform } from '@/types'
import { apiClient } from './client'
import { mockReviews } from '@/data/mockData'

const isMock = !import.meta.env.VITE_API_BASE_URL

export interface ReviewFilters {
  sentiment?: Sentiment[]
  rating?: number[]
  platform?: Platform[]
  keyword?: string
  dateFrom?: string
  dateTo?: string
  sortBy?: 'date_desc' | 'date_asc' | 'rating_desc' | 'rating_asc'
  page?: number
  pageSize?: number
}

export interface ReviewsResponse {
  reviews: Review[]
  total: number
  page: number
  pageSize: number
}

export const reviewsApi = {
  async list(locationId: string, filters: ReviewFilters = {}): Promise<ReviewsResponse> {
    if (isMock) {
      let reviews = mockReviews.filter((r) => r.locationId === locationId)
      if (filters.sentiment?.length) reviews = reviews.filter((r) => filters.sentiment!.includes(r.sentiment))
      if (filters.rating?.length) reviews = reviews.filter((r) => filters.rating!.includes(r.rating))
      if (filters.platform?.length) reviews = reviews.filter((r) => filters.platform!.includes(r.platform))
      if (filters.keyword) {
        const kw = filters.keyword.toLowerCase()
        reviews = reviews.filter((r) => r.text.toLowerCase().includes(kw))
      }
      if (filters.dateFrom) reviews = reviews.filter((r) => r.date >= filters.dateFrom!)
      if (filters.dateTo) reviews = reviews.filter((r) => r.date <= filters.dateTo!)

      if (filters.sortBy === 'date_asc') reviews.sort((a, b) => a.date.localeCompare(b.date))
      else if (filters.sortBy === 'rating_desc') reviews.sort((a, b) => b.rating - a.rating)
      else if (filters.sortBy === 'rating_asc') reviews.sort((a, b) => a.rating - b.rating)
      else reviews.sort((a, b) => b.date.localeCompare(a.date)) // default date_desc

      const page = filters.page ?? 1
      const pageSize = filters.pageSize ?? 20
      const total = reviews.length
      const sliced = reviews.slice((page - 1) * pageSize, page * pageSize)
      return { reviews: sliced, total, page, pageSize }
    }

    const res = await apiClient.get<ReviewsResponse>(`/locations/${locationId}/reviews`, { params: filters })
    return res.data
  },
}
