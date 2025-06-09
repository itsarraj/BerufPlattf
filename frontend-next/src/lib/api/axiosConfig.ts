import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getStore } from '../store/store';
import { refreshAccessToken, logout } from '../slices/authSlice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const axiosConfig = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
axiosConfig.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only add token on client side
    if (typeof window !== 'undefined') {
      const store = getStore();
      const state = store.getState();
      const token = state.auth.accessToken;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosConfig.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    const store = getStore();
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;

    // If error is 401 and we haven't already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken &&
      originalRequest
    ) {
      originalRequest._retry = true;

      try {
        // Refresh the token
        const result = await store.dispatch(refreshAccessToken());

        if (refreshAccessToken.fulfilled.match(result)) {
          const newAccessToken = result.payload;

          // Update the request header
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          // Retry the original request
          return axiosConfig(originalRequest);
        } else {
          // Refresh failed, logout user
          store.dispatch(logout());
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // If refresh fails, logout the user
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;