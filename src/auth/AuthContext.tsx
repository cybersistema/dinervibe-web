import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import type { AuthUser, AuthTokens, Permission } from '@/types'
import { hasPermission } from './permissions'

interface AuthContextValue {
  user: AuthUser | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  can: (permission: Permission) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const TOKEN_KEY = 'dv_tokens'
const USER_KEY = 'dv_user'
const REFRESH_BUFFER_MS = 60_000 // refresh 1 min before expiry

function loadFromStorage(): { user: AuthUser | null; tokens: AuthTokens | null } {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY) ?? 'null') as AuthUser | null
    const tokens = JSON.parse(localStorage.getItem(TOKEN_KEY) ?? 'null') as AuthTokens | null
    return { user, tokens }
  } catch {
    return { user: null, tokens: null }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: storedUser, tokens: storedTokens } = loadFromStorage()
  const [user, setUser] = useState<AuthUser | null>(storedUser)
  const [tokens, setTokens] = useState<AuthTokens | null>(storedTokens)
  const [isLoading, setIsLoading] = useState(false)
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearSession = useCallback(() => {
    setUser(null)
    setTokens(null)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current)
  }, [])

  const scheduleRefresh = useCallback((tok: AuthTokens) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current)
    const delay = tok.expiresAt - Date.now() - REFRESH_BUFFER_MS
    if (delay <= 0) {
      clearSession()
      return
    }
    refreshTimerRef.current = setTimeout(async () => {
      try {
        const { authApi } = await import('@/api/auth')
        const newTokens = await authApi.refresh(tok.refreshToken)
        setTokens(newTokens)
        localStorage.setItem(TOKEN_KEY, JSON.stringify(newTokens))
        scheduleRefresh(newTokens)
      } catch {
        clearSession()
      }
    }, delay)
  }, [clearSession])

  useEffect(() => {
    if (tokens) scheduleRefresh(tokens)
    return () => { if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current) }
  }, [tokens, scheduleRefresh])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { authApi } = await import('@/api/auth')
      const { user: loggedInUser, tokens: newTokens } = await authApi.login(email, password)
      setUser(loggedInUser)
      setTokens(newTokens)
      localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser))
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newTokens))
      scheduleRefresh(newTokens)
    } finally {
      setIsLoading(false)
    }
  }, [scheduleRefresh])

  const can = useCallback(
    (permission: Permission) => user ? hasPermission(user.role, permission) : false,
    [user]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated: !!user && !!tokens,
        isLoading,
        login,
        logout: clearSession,
        can,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
