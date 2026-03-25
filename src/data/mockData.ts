import type { Location, Review, MonthlyReport } from '@/types'

export const mockLocations: Location[] = [
  {
    id: 'loc1',
    name: 'Downtown Bistro',
    address: '123 Main St, Chicago, IL 60601',
    platforms: ['google', 'yelp', 'tripadvisor'],
    avgRating: 4.6,
    reviewCount: 312,
    sentimentGrade: 'A',
    trendDelta: 0.2,
  },
  {
    id: 'loc2',
    name: 'Wicker Park Kitchen',
    address: '456 North Ave, Chicago, IL 60622',
    platforms: ['google', 'yelp'],
    avgRating: 4.1,
    reviewCount: 198,
    sentimentGrade: 'B',
    trendDelta: -0.1,
  },
  {
    id: 'loc3',
    name: 'Lincoln Square Cafe',
    address: '789 Western Ave, Chicago, IL 60625',
    platforms: ['google', 'opentable'],
    avgRating: 3.8,
    reviewCount: 87,
    sentimentGrade: 'C',
    trendDelta: 0.3,
  },
  {
    id: 'loc4',
    name: 'River North Grill',
    address: '321 Clark St, Chicago, IL 60654',
    platforms: ['google', 'yelp', 'opentable'],
    avgRating: 4.4,
    reviewCount: 425,
    sentimentGrade: 'A',
    trendDelta: 0.0,
  },
]

const REVIEW_TEXTS = [
  { text: 'Absolutely loved the food! The pasta was perfectly cooked and the service was exceptional.', sentiment: 'positive' as const },
  { text: 'Great atmosphere and friendly staff. Will definitely come back.', sentiment: 'positive' as const },
  { text: 'The food was decent but nothing special. Service was a bit slow.', sentiment: 'neutral' as const },
  { text: 'Average experience overall. The location is convenient though.', sentiment: 'neutral' as const },
  { text: 'Disappointing visit. The food was cold and we waited over an hour.', sentiment: 'negative' as const },
  { text: 'Not worth the price. Found hair in my dish and manager was dismissive.', sentiment: 'negative' as const },
  { text: 'Best brunch spot in the neighborhood! Creative menu and fresh ingredients.', sentiment: 'positive' as const },
  { text: 'Cozy interior, good cocktails. The noise level can get a bit high on weekends.', sentiment: 'neutral' as const },
]

let reviewCounter = 0
export const mockReviews: Review[] = mockLocations.flatMap((loc) =>
  Array.from({ length: 25 }, (_, i) => {
    const sample = REVIEW_TEXTS[(reviewCounter++) % REVIEW_TEXTS.length]
    const rating = sample.sentiment === 'positive' ? 5 : sample.sentiment === 'neutral' ? 3 : 2
    const platforms = loc.platforms
    return {
      id: `rev-${loc.id}-${i}`,
      locationId: loc.id,
      rating,
      text: sample.text,
      sentiment: sample.sentiment,
      date: new Date(Date.now() - i * 86400_000 * 3).toISOString().split('T')[0],
      platform: platforms[i % platforms.length],
      authorName: `Guest ${i + 1}`,
      ownerReply: i % 5 === 0 ? 'Thank you for your feedback! We look forward to seeing you again.' : undefined,
    } satisfies Review
  })
)

export function mockMonthlyReport(locationId: string, year: number, month: number): MonthlyReport {
  const loc = mockLocations.find((l) => l.id === locationId)
  const base = loc?.avgRating ?? 4.0
  return {
    locationId,
    year,
    month,
    avgRating: base,
    reviewCount: Math.round(20 + Math.random() * 30),
    sentimentGrade: loc?.sentimentGrade ?? 'B',
    positiveRate: 0.65 + Math.random() * 0.2,
    trendVsPrior: (Math.random() - 0.4) * 0.5,
    weeklyBreakdown: [1, 2, 3, 4].map((week) => ({
      week,
      reviewCount: Math.round(5 + Math.random() * 10),
      avgRating: Math.round((base + (Math.random() - 0.5) * 0.6) * 10) / 10,
    })),
    sentimentDistribution: {
      positive: Math.round(60 + Math.random() * 20),
      neutral: Math.round(10 + Math.random() * 15),
      negative: Math.round(5 + Math.random() * 10),
    },
  }
}
