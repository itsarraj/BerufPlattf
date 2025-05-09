// src/services/api.ts
import axios from 'axios';
import { store } from '@/lib/store';
import { refreshToken } from '@/features/auth/authSlice';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const { auth } = store.getState();
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await store.dispatch(refreshToken(refreshToken));
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;