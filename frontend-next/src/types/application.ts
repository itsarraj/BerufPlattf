export interface Application {
  id: string
  jobId: string
  userId: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  appliedAt: string
  resume: string
  coverLetter?: string
  jobTitle?: string
  company?: string
}