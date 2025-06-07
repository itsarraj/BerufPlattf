'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/lib/hooks/redux'
import { addToast } from '@/lib/slices/uiSlice'

export default function AuthGuard({
  children,
  requireAuth = true,
  allowedRoles = ['user', 'recruiter']
}: {
  children: React.ReactNode
  requireAuth?: boolean
  allowedRoles?: ('user' | 'recruiter')[]
}) {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      dispatch(addToast({
        message: 'You need to sign in to access this page',
        type: 'error'
      }))
      router.push('/login')
    }

    if (isAuthenticated && user && !allowedRoles.includes(user.role)) {
      dispatch(addToast({
        message: 'You do not have permission to access this page',
        type: 'error'
      }))
      router.push('/dashboard')
    }

    if (!requireAuth && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, requireAuth, allowedRoles, router, dispatch])

  if (requireAuth && !isAuthenticated) {
    return <div>Loading authentication...</div>
  }

  if (requireAuth && isAuthenticated && user && !allowedRoles.includes(user.role)) {
    return <div>Checking permissions...</div>
  }

  return <>{children}</>
}