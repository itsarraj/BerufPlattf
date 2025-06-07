import { api } from './axiosConfig';

export const uploadAPI = {
  uploadFile: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  },

  deleteFile: async (url: string): Promise<void> => {
    await api.delete('/upload', { data: { url } })
  }
}