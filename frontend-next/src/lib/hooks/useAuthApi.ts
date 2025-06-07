import { useAppSelector } from './redux'
import api from '@/lib/api/axiosConfig'

export function useAuthApi() {
  const accessToken = useAppSelector(state => state.auth.accessToken)

  const authApi = api;

  authApi.interceptors.request.use(config => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  return authApi
}