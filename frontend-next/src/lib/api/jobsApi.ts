import { api } from './axiosConfig';
import { createAuthApi } from './axiosConfig';
import type { AppStore } from '@/lib/store/store';

// export const jobsAPI = {
//   getPublicJobs: async (params: any, store?: AppStore) => {
//     // Use store if provided (SSR), otherwise use regular api (CSR)
//     const api = store
//       ? createAuthApi(store.getState().auth.accessToken)
//       : createAuthApi();

//     const response = await api.get('/jobs/public', { params });
//     return response.data;
//   },
//   // ... other methods
// };

export interface Job {
  id: string;
  company_id: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  created_at: string;
}
export interface Company {
  id: number;
  name: string;
  description: string;
  website: string;
  created_at: string;
}

export const jobsAPI = {
  getPublicJobs: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
    minSalary?: number;
    maxSalary?: number;
    type?: string;
  }) => {
    const response = await api.get('/jobs/public', { params })
    // const response = await api.get('/jobs/public');
    return response.data;
  },

  getPersonalizedJobs: async (userId: string) => {
    const response = await api.get(`/jobs/personalized/${userId}`);
    return response.data;
  },

  getRecruiterJobs: async (recruiterId: string) => {
    const response = await api.get(`/jobs/recruiter/${recruiterId}`);
    return response.data;
  },

  getJobDetails: async (jobId: string) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  },

  createJob: async (jobData: Omit<Job, 'id' | 'created_at'>) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  updateJob: async (jobId: string, jobData: Partial<Job>) => {
    const response = await api.patch(`/jobs/${jobId}`, jobData);
    return response.data;
  },

  deleteJob: async (jobId: string) => {
    await api.delete(`/jobs/${jobId}`);
  },
};