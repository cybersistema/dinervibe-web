import type { AuthUser, AuthTokens } from '@/types'
import { apiClient } from './client'

// Mock data used when VITE_API_BASE_URL is not set
const MOCK_USERS: Record<string, { user: AuthUser; password: string }> = {
  'owner@demo.com': {
    password: 'demo',
    user: { id: 'u1', email: 'owner@demo.com', name: 'Lesley Owner', role: 'owner', locationIds: [] },
  },
  'manager@demo.com': {
    password: 'demo',
    user: { id: 'u2', email: 'manager@demo.com', name: 'Alex Manager', role: 'manager', locationIds: ['loc1', 'loc2'] },
  },
  'staff@demo.com': {
    password: 'demo',
    user: { id: 'u3', email: 'staff@demo.com', name: 'Sam Staff', role: 'staff', locationIds: ['loc1'] },
  },
}

function mockTokens(): AuthTokens {
  return {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiresAt: Date.now() + 3600_000,
  }
}

const isMock = !import.meta.env.VITE_API_BASE_URL

export const authApi = {
  async login(email: string, password: string): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    if (isMock) {
      const record = MOCK_USERS[email]
      if (!record || record.password !== password) {
        throw new Error('Invalid credentials')
      }
      return { user: record.user, tokens: mockTokens() }
    }
    const res = await apiClient.post<{ user: AuthUser; tokens: AuthTokens }>('/auth/login', { email, password })
    return res.data
  },

  async refresh(refreshToken: string): Promise<AuthTokens> {
    if (isMock) return mockTokens()
    const res = await apiClient.post<AuthTokens>('/auth/refresh', { refreshToken })
    return res.data
  },

  async logout(): Promise<void> {
    if (isMock) return
    await apiClient.post('/auth/logout')
  },
}
