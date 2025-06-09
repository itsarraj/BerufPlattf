import axios from 'axios';
import { axiosConfig } from './axiosConfig';

export const authApi = {
  register: async (email: string, password: string) => {
    const response = await axiosConfig.post(
      `/auth/register`,
      { email, password },
    );
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await axiosConfig.post(
      `/auth/login`,
      { email, password },
    );
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await axiosConfig.post(
      `/auth/refresh-token`,
      { refreshToken },
    );
    return response.data;
  },

  logout: async (refreshToken: string) => {
    await axiosConfig.post(
      `/auth/logout`,
      { refreshToken },
    );
  },

  forgotPassword: async (email: string) => {
    const response = await axiosConfig.post(
      `/auth/forgot-password`,
      { email },
    );
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await axiosConfig.post(
      `/auth/reset-password`,
      { token, newPassword },
    );
    return response.data;
  },

  socialLogin: async (provider: string, code: string) => {
    const response = await axiosConfig.get(
      `/auth/${provider}/callback?code=${code}`,
    );
    return response.data;
  }
};