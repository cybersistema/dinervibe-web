import type { MonthlyReport } from '@/types'
import { apiClient } from './client'
import { mockMonthlyReport } from '@/data/mockData'

const isMock = !import.meta.env.VITE_API_BASE_URL

export const reportsApi = {
  async getMonthly(locationId: string, year: number, month: number): Promise<MonthlyReport> {
    if (isMock) return mockMonthlyReport(locationId, year, month)
    const res = await apiClient.get<MonthlyReport>(`/locations/${locationId}/reports/monthly`, {
      params: { year, month },
    })
    return res.data
  },
}
