import type { Location } from '@/types'
import { apiClient } from './client'
import { mockLocations } from '@/data/mockData'

const isMock = !import.meta.env.VITE_API_BASE_URL

export const locationsApi = {
  async list(): Promise<Location[]> {
    if (isMock) return mockLocations
    const res = await apiClient.get<Location[]>('/locations')
    return res.data
  },

  async get(id: string): Promise<Location> {
    if (isMock) {
      const loc = mockLocations.find((l) => l.id === id)
      if (!loc) throw new Error(`Location ${id} not found`)
      return loc
    }
    const res = await apiClient.get<Location>(`/locations/${id}`)
    return res.data
  },
}
