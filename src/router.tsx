import { createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from '@/auth/RequireAuth'
import { lazy, Suspense } from 'react'

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const LocationDetailPage = lazy(() => import('@/pages/LocationDetailPage'))
const ReviewsPage = lazy(() => import('@/pages/ReviewsPage'))
const ReportsPage = lazy(() => import('@/pages/ReportsPage'))

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/unauthorized',
    element: (
      <Suspense fallback={<Loading />}>
        <UnauthorizedPage />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <RequireAuth permission="view:dashboard">
        <Suspense fallback={<Loading />}>
          <DashboardPage />
        </Suspense>
      </RequireAuth>
    ),
  },
  {
    path: '/locations/:id',
    element: (
      <RequireAuth permission="view:reviews">
        <Suspense fallback={<Loading />}>
          <LocationDetailPage />
        </Suspense>
      </RequireAuth>
    ),
  },
  {
    path: '/locations/:id/reviews',
    element: (
      <RequireAuth permission="view:reviews">
        <Suspense fallback={<Loading />}>
          <ReviewsPage />
        </Suspense>
      </RequireAuth>
    ),
  },
  {
    path: '/locations/:id/reports',
    element: (
      <RequireAuth permission="view:reports">
        <Suspense fallback={<Loading />}>
          <ReportsPage />
        </Suspense>
      </RequireAuth>
    ),
  },
])
