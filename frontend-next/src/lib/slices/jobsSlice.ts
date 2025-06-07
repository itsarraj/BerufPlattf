import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { jobsAPI, Job } from '../api/jobsApi'

interface JobsState {
  publicJobs: Job[]
  personalizedJobs: Job[]
  recruiterJobs: Job[]
  currentJob: Job | null
  filters: {
    location: string
    salary: [number, number]
    company: string
    search: string
  }
  pagination: {
    page: number
    limit: number
    total: number
  }
  loading: boolean
  error: string | null
}

const initialState: JobsState = {
  publicJobs: [],
  personalizedJobs: [],
  recruiterJobs: [],
  currentJob: null,
  filters: {
    location: '',
    salary: [0, 200000],
    company: '',
    search: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  loading: false,
  error: null,
}

export const fetchPublicJobs = createAsyncThunk(
  'jobs/fetchPublic',
  async (params: { page?: number; limit?: number; search?: string }, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getPublicJobs(params)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch jobs')
    }
  }
)

export const fetchPersonalizedJobs = createAsyncThunk(
  'jobs/fetchPersonalized',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getPersonalizedJobs(userId)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch personalized jobs')
    }
  }
)

export const fetchRecruiterJobs = createAsyncThunk(
  'jobs/fetchRecruiter',
  async (recruiterId: string, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getRecruiterJobs(recruiterId)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch recruiter jobs')
    }
  }
)

export const fetchJobDetails = createAsyncThunk(
  'jobs/fetchDetails',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getJobDetails(jobId)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch job details')
    }
  }
)

export const createJob = createAsyncThunk(
  'jobs/create',
  async (jobData: Omit<Job, 'id' | 'postedAt'>, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.createJob(jobData)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create job')
    }
  }
)

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    clearCurrentJob: (state) => {
      state.currentJob = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPublicJobs.fulfilled, (state, action) => {
        state.loading = false
        state.publicJobs = action.payload.jobs
        state.pagination.total = action.payload.total
      })
      .addCase(fetchPublicJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(fetchPersonalizedJobs.fulfilled, (state, action) => {
        state.personalizedJobs = action.payload.jobs
      })

      .addCase(fetchRecruiterJobs.fulfilled, (state, action) => {
        state.recruiterJobs = action.payload.jobs
      })

      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.currentJob = action.payload
      })

      .addCase(createJob.fulfilled, (state, action) => {
        state.recruiterJobs.unshift(action.payload)
      })
  },
})

export const { setFilters, setPagination, clearCurrentJob, clearError } = jobsSlice.actions
export default jobsSlice.reducer