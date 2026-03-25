// Core domain types

export type Platform = 'google' | 'yelp' | 'tripadvisor' | 'opentable' | 'other'

export type Sentiment = 'positive' | 'neutral' | 'negative'

export type SentimentGrade = 'A' | 'B' | 'C' | 'D' | 'F'

export interface Location {
  id: string
  name: string
  address: string
  platforms: Platform[]
  avgRating: number
  reviewCount: number
  sentimentGrade: SentimentGrade
  trendDelta: number // positive = up, negative = down vs prior month
}

export interface Review {
  id: string
  locationId: string
  rating: number
  text: string
  sentiment: Sentiment
  date: string
  platform: Platform
  authorName: string
  ownerReply?: string
}

export interface MonthlyReport {
  locationId: string
  year: number
  month: number // 1-12
  avgRating: number
  reviewCount: number
  sentimentGrade: SentimentGrade
  positiveRate: number
  trendVsPrior: number
  weeklyBreakdown: WeeklyBreakdown[]
  sentimentDistribution: SentimentDistribution
}

export interface WeeklyBreakdown {
  week: number
  reviewCount: number
  avgRating: number
}

export interface SentimentDistribution {
  positive: number
  neutral: number
  negative: number
}

// Auth types
export type UserRole = 'owner' | 'manager' | 'staff'

export type Permission =
  | 'view:dashboard'
  | 'view:reviews'
  | 'view:reports'
  | 'export:reports'
  | 'manage:locations'
  | 'manage:users'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
  locationIds: string[] // empty = all locations (owner)
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number // ms timestamp
}
