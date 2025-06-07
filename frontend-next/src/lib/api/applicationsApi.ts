import { api } from './axiosConfig';

export interface Application {
  id: string;
  job_id: number;
  user_id: number;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  match_score?: number;
  matched_on?: string;
  created_at: string;
}

export const applicationsAPI = {
  getMyApplications: async () => {
    const response = await api.get('/applications/me');
    return response.data;
  },

  getApplicationDetails: async (applicationId: string) => {
    const response = await api.get(`/applications/${applicationId}`);
    return response.data;
  },

  applyToJob: async (jobId: string, applicationData: { resume: string; coverLetter?: string; }) => {
    const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
    return response.data;
  },

  updateApplicationStatus: async (applicationId: string, status: string) => {
    const response = await api.patch(`/applications/${applicationId}/status`, { status });
    return response.data;
  },

  withdrawApplication: async (applicationId: string) => {
    await api.delete(`/applications/${applicationId}`);
  },
};