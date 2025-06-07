import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userAPI } from '../api/usersApi'

interface UserProfile {
  id: string
  name: string
  email: string
  role: 'user' | 'recruiter'
  resume_data: string
}

interface UserState {
  profile: UserProfile | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
}

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getProfile()
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile')
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateProfile(data)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update profile')
    }
  }
)

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
      await userAPI.changePassword(data)
      return true
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to change password')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = { ...state.profile, ...action.payload } as UserProfile
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(changePassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default userSlice.reducer