// src/features/applications/applicationsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@/services/api';

interface Application {
  id: number;
  job_id: number;
  user_id: number;
  status: string;
  match_score: number;
}

interface ApplicationsState {
  applications: Application[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ApplicationsState = {
  applications: [],
  status: 'idle',
  error: null
};

export const applyToJob = createAsyncThunk(
  'applications/apply',
  async (jobId: number) => {
    const response = await api.post(`/api/applications/jobs/${jobId}`);
    return response.data;
  }
);

export const fetchUserApplications = createAsyncThunk(
  'applications/fetchUserApplications',
  async () => {
    const response = await api.get('/api/applications');
    return response.data;
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserApplications.fulfilled, (state, action) => {
        state.applications = action.payload;
      });
  }
});

export default applicationsSlice.reducer;