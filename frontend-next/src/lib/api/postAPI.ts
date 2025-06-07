import { api } from './axiosConfig';

interface Post {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: string
  updatedAt: string
}

export const postAPI = {
  createPost: async (data: { title: string; content: string }): Promise<Post> => {
    const response = await api.post('/posts', data)
    return response.data
  },

  getPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts')
    return response.data
  },

  getPostById: async (id: string): Promise<Post> => {
    const response = await api.get(`/posts/${id}`)
    return response.data
  },

  updatePost: async (id: string, data: { title?: string; content?: string }): Promise<Post> => {
    const response = await api.patch(`/posts/${id}`, data)
    return response.data
  },

  deletePost: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/posts/${id}`)
    return response.data
  }
}