import { useQuery } from '@tanstack/react-query'
import { reportsApi } from '@/api/reports'

export const reportKeys = {
  monthly: (locationId: string, year: number, month: number) =>
    ['reports', 'monthly', locationId, year, month] as const,
}

export function useMonthlyReport(locationId: string, year: number, month: number) {
  return useQuery({
    queryKey: reportKeys.monthly(locationId, year, month),
    queryFn: () => reportsApi.getMonthly(locationId, year, month),
    staleTime: 10 * 60_000,
    enabled: !!locationId && !!year && !!month,
  })
}
