import type { UserRole, Permission } from '@/types'

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: [
    'view:dashboard',
    'view:reviews',
    'view:reports',
    'export:reports',
    'manage:locations',
    'manage:users',
  ],
  manager: [
    'view:dashboard',
    'view:reviews',
    'view:reports',
    'export:reports',
  ],
  staff: [
    'view:dashboard',
    'view:reviews',
  ],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}
