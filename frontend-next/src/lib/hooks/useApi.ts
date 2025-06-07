import { useState, useCallback } from 'react'
import { useAppDispatch } from './redux'
import { showToast } from '@/lib/slices/uiSlice'

type ApiFunction = (...args: any[]) => Promise<any>

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  const callApi = useCallback(
    async (apiFunction: ApiFunction, ...args: any[]) => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiFunction(...args)
        return response
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred'
        setError(errorMessage)
        dispatch(showToast({ message: errorMessage, type: 'error' }))
        throw err
      } finally {
        setLoading(false)
      }
    },
    [dispatch]
  )

  return { callApi, loading, error }
}