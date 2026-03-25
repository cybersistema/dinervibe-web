import { useQuery } from '@tanstack/react-query'
import { locationsApi } from '@/api/locations'

export const locationKeys = {
  all: ['locations'] as const,
  detail: (id: string) => ['locations', id] as const,
}

export function useLocations() {
  return useQuery({
    queryKey: locationKeys.all,
    queryFn: locationsApi.list,
    staleTime: 5 * 60_000,
  })
}

export function useLocation(id: string) {
  return useQuery({
    queryKey: locationKeys.detail(id),
    queryFn: () => locationsApi.get(id),
    staleTime: 5 * 60_000,
    enabled: !!id,
  })
}
