// lib/api/axiosConfig.ts
import axios from 'axios'
import { makeStore } from '@/lib/store/store'

// Create basic axios instance without interceptors
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
})

// Function to create an authenticated axios instance
export const createAuthApi = (accessToken?: string | null) => {
  const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  })

  // Add request interceptor
  authApi.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  // Add response interceptor for token refresh
  authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          // Create temporary store for token refresh
          const tempStore = makeStore()
          const { payload } = await tempStore.dispatch(refreshAccessToken())

          if (payload?.accessToken) {
            originalRequest.headers.Authorization = `Bearer ${payload.accessToken}`
            return authApi(originalRequest)
          }
        } catch (refreshError) {
          console.error('Token refresh failed', refreshError)
        }
      }

      return Promise.reject(error)
    }
  )

  return authApi
}
