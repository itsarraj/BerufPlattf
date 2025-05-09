// src/features/jobs/jobsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@/services/api';

interface Job {
  id: number;
  title: string;
  description: string;
  location?: string;
  company_id: number;
}

interface JobsState {
  jobs: Job[];
  currentJob: Job | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  currentJob: null,
  status: 'idle',
  error: null
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await api.get('/api/jobs');
  return response.data;
});

export const fetchJobDetails = createAsyncThunk(
  'jobs/fetchJobDetails',
  async (jobId: string) => {
    const response = await api.get(`/api/jobs/${jobId}`);
    return response.data;
  }
);

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData: Omit<Job, 'id' | 'company_id'>) => {
    const response = await api.post('/api/jobs/recruiters', jobData);
    return response.data;
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      });
  }
});

export default jobsSlice.reducer;