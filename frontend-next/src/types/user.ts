export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'recruiter'
  skills?: string[]
  experience?: string
  education?: string
  company?: string
  createdAt: string
  updatedAt: string
}