import { Job } from '@/lib/api/jobsApi'
import { APPLICATION_STATUSES } from './constants'

export const filterJobs = (jobs: Job[], filters: any): Job[] => {
  return jobs.filter(job => {
    // Filter by job type
    if (filters.jobType && filters.jobType.length > 0 && !filters.jobType.includes(job.type)) {
      return false
    }

    // Filter by experience level
    if (filters.experienceLevel && filters.experienceLevel.length > 0 && !filters.experienceLevel.includes(job.experienceLevel)) {
      return false
    }

    // Filter by salary range
    if (filters.salaryRange && (job.salary < filters.salaryRange[0] || job.salary > filters.salaryRange[1])) {
      return false
    }

    // Filter by remote
    if (filters.remote && !job.location.toLowerCase().includes('remote')) {
      return false
    }

    // Filter by search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (
        !job.title.toLowerCase().includes(searchLower) &&
        !job.company.toLowerCase().includes(searchLower) &&
        !job.description.toLowerCase().includes(searchLower) &&
        !job.skillsRequired.some(skill => skill.toLowerCase().includes(searchLower))
      ) {
        return false
      }
    }

    return true
  })
}

export const sortJobs = (jobs: Job[], sortBy: string): Job[] => {
  return [...jobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      case 'oldest':
        return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
      case 'salary-high':
        return b.salary - a.salary
      case 'salary-low':
        return a.salary - b.salary
      default:
        return 0
    }
  })
}

export const paginate = (items: any[], page: number, pageSize: number): any[] => {
  const startIndex = (page - 1) * pageSize
  return items.slice(startIndex, startIndex + pageSize)
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case APPLICATION_STATUSES[0]: // pending
      return 'bg-yellow-100 text-yellow-800'
    case APPLICATION_STATUSES[1]: // reviewed
      return 'bg-blue-100 text-blue-800'
    case APPLICATION_STATUSES[2]: // accepted
      return 'bg-green-100 text-green-800'
    case APPLICATION_STATUSES[3]: // rejected
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}