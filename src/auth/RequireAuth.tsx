import { Navigate, useLocation } from 'react-router-dom'
import type { Permission } from '@/types'
import { useAuth } from './AuthContext'

interface RequireAuthProps {
  children: React.ReactNode
  permission?: Permission
}

export function RequireAuth({ children, permission }: RequireAuthProps) {
  const { isAuthenticated, can } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (permission && !can(permission)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
