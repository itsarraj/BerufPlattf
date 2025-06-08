import axios from 'axios';
import { store } from '../store/store';
import { setLoading, setError } from '../slices/authSlice';
import { axiosConfig } from './axiosConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const authApi = {
  register: async (email: string, password: string) => {
    try {
      store.dispatch(setLoading(true));
      const response = await axios.post(`${API_URL}/auth/register`, { email, password }, axiosConfig);
      return response.data;
    } catch (error: any) {
      store.dispatch(setError(error.response?.data?.error || 'Registration failed'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  login: async (email: string, password: string) => {
    try {
      store.dispatch(setLoading(true));
      const response = await axios.post(`${API_URL}/auth/login`, { email, password }, axiosConfig);
      return response.data;
    } catch (error: any) {
      store.dispatch(setError(error.response?.data?.error || 'Login failed'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken }, axiosConfig);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async (refreshToken: string) => {
    try {
      await axios.post(`${API_URL}/auth/logout`, { refreshToken }, axiosConfig);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
};