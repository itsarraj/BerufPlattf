import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI } from '../api/authApi'
import type { RootState } from '../store/store'

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string; type: 'user' | 'recruiter' }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string; type: 'user' | 'recruiter' }, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed')
    }
  }
)

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const refreshToken = state.auth.refreshToken
      if (!refreshToken) throw new Error('No refresh token available')

      const response = await authAPI.refreshToken()
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Token refresh failed')
    }
  }
)

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authAPI.logout()
})

export const verifyToken = createAsyncThunk('auth/verifyToken', async (_, { getState }) => {
  const state = getState() as RootState
  const accessToken = state.auth.accessToken
  if (!accessToken) return { isValid: false }

  const response = await authAPI.verifyToken()
  return response
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })

      .addCase(logoutUser.fulfilled, (state) => {
        return initialState
      })

      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isValid
        if (!action.payload.isValid) {
          state.accessToken = null
          state.refreshToken = null
          state.user = null
        }
      })
  },
})

export const { clearError, setCredentials } = authSlice.actions
export default authSlice.reducer