export interface Job {
  id: string
  title: string
  description: string
  location: string
  type: string
  salary: number
  company: string
  postedAt: string
  skillsRequired: string[]
  experienceLevel: string
  status: 'draft' | 'published' | 'archived'
}