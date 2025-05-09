// src/features/auth/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

interface AuthState {
  user: null | { id: number; role: 'user' | 'recruiter' };
  accessToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: 'idle',
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string; type: 'user' | 'recruiter' }) => {
    const response = await axios.post('/api/auth/login/' + credentials.type, {
      email: credentials.email,
      password: credentials.password
    });
    return response.data;
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (refreshToken: string) => {
    const response = await axios.post('/api/auth/refresh-token', { refreshToken });
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('refreshToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const decoded = jwtDecode<{ id: number; role: 'user' | 'recruiter' }>(action.payload.accessToken);
        state.user = { id: decoded.id, role: decoded.role };
        state.accessToken = action.payload.accessToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;