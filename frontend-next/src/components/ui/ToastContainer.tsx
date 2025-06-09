'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux'
// import { removeToast } from '@/lib/slices/uiSlice'
import Toast from './Toast'

export function ToastContainer() {
  const dispatch = useAppDispatch()
  // const toasts = useAppSelector((state) => state.ui.toasts)

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        // dispatch(removeToast(toasts[0].id))
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [toasts, dispatch])

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3">
      {/* {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))} */}
    </div>
  )
}