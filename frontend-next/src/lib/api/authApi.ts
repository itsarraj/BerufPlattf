import { api } from './axiosConfig';

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
}

interface TokenResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    name: string
    email: string
    role: 'user' | 'recruiter'
  }
}

export const authAPI = {
  login: async (data: LoginData): Promise<TokenResponse> => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterData): Promise<{ message: string }> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  refreshToken: async (): Promise<TokenResponse> => {
    const response = await api.post('/auth/refresh-token')
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  verifyToken: async (): Promise<{ isValid: boolean }> => {
    const response = await api.get('/auth/verify')
    return response.data
  }
}