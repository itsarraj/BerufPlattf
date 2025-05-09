// src/services/jobs.ts
export const JobsService = {
  createJob: (data: JobCreateData) => api.post('/jobs/recruiters', data),
  getJobMatches: (jobId: string) => api.get(`/jobs/${jobId}/recruiters/matches`),
  listJobs: () => api.get('/jobs'),
};