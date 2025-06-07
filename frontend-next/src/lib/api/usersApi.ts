import { api } from './axiosConfig';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface UpdateProfileData {
  name?: string
  resume_data?: string
}

export const userAPI = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/users/me')
    return response.data
  },

  updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
    const response = await api.patch('/users/me', data)
    return response.data
  },

  changePassword: async (data: {
    currentPassword: string
    newPassword: string
  }): Promise<void> => {
    await api.post('/users/change-password', data)
  },

  deleteAccount: async (): Promise<{ message: string }> => {
    const response = await api.delete('/users/me')
    return response.data
  }
}