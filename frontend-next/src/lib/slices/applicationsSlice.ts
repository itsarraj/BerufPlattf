import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { applicationsAPI, Application } from '../api/applicationsApi'

interface ApplicationsState {
  applications: Application[]
  currentApplication: Application | null
  loading: boolean
  error: string | null
}

const initialState: ApplicationsState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,
}

export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMyApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await applicationsAPI.getMyApplications()
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch applications')
    }
  }
)

export const fetchApplicationDetails = createAsyncThunk(
  'applications/fetchDetails',
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const response = await applicationsAPI.getApplicationDetails(applicationId)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch application details')
    }
  }
)

export const applyToJob = createAsyncThunk(
  'applications/apply',
  async (data: { jobId: string; resume: string; coverLetter?: string }, { rejectWithValue }) => {
    try {
      const response = await applicationsAPI.applyToJob(data.jobId, {
        resume: data.resume,
        coverLetter: data.coverLetter
      })
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to apply to job')
    }
  }
)

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async (data: { applicationId: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await applicationsAPI.updateApplicationStatus(
        data.applicationId,
        data.status
      )
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update application status')
    }
  }
)

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    clearCurrentApplication: (state) => {
      state.currentApplication = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyApplications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false
        state.applications = action.payload
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(fetchApplicationDetails.fulfilled, (state, action) => {
        state.currentApplication = action.payload
      })

      .addCase(applyToJob.fulfilled, (state, action) => {
        state.applications.push(action.payload)
      })

      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        if (state.currentApplication?.id === action.payload.id) {
          state.currentApplication.status = action.payload.status
        }

        state.applications = state.applications.map(app =>
          app.id === action.payload.id ? { ...app, status: action.payload.status } : app
        )
      })
  },
})

export const { clearCurrentApplication } = applicationsSlice.actions
export default applicationsSlice.reducer