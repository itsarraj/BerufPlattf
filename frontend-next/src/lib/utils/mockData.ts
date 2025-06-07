export const jobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced frontend developer to join our team...',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: 120000,
    company: 'TechCorp',
    postedAt: '2023-06-15T08:00:00Z',
    skillsRequired: ['React', 'TypeScript', 'CSS', 'Redux'],
    experienceLevel: 'senior',
    status: 'published'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    description: 'Join our backend team to build scalable APIs and services...',
    location: 'Remote',
    type: 'full-time',
    salary: 110000,
    company: 'DataSystems',
    postedAt: '2023-06-20T10:30:00Z',
    skillsRequired: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
    experienceLevel: 'mid',
    status: 'published'
  },
  {
    id: '3',
    title: 'UX Designer',
    description: 'Help us create beautiful and intuitive user experiences...',
    location: 'New York, NY',
    type: 'contract',
    salary: 90000,
    company: 'DesignHub',
    postedAt: '2023-06-18T14:15:00Z',
    skillsRequired: ['Figma', 'UI/UX', 'User Research', 'Prototyping'],
    experienceLevel: 'mid',
    status: 'published'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    description: 'Maintain and improve our infrastructure and deployment pipelines...',
    location: 'Austin, TX',
    type: 'full-time',
    salary: 130000,
    company: 'CloudTech',
    postedAt: '2023-06-22T09:45:00Z',
    skillsRequired: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
    experienceLevel: 'senior',
    status: 'published'
  },
  {
    id: '5',
    title: 'Product Manager',
    description: 'Lead product development and strategy for our core platform...',
    location: 'Remote',
    type: 'full-time',
    salary: 140000,
    company: 'ProductLabs',
    postedAt: '2023-06-10T11:20:00Z',
    skillsRequired: ['Product Strategy', 'Agile', 'User Stories', 'Roadmapping'],
    experienceLevel: 'senior',
    status: 'published'
  }
]

export const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    skills: ['React', 'JavaScript', 'CSS'],
    experience: '5 years of frontend development',
    education: 'BS in Computer Science',
    createdAt: '2023-01-15T08:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'recruiter',
    company: 'TechCorp',
    createdAt: '2023-02-20T10:30:00Z'
  }
]

export const applications = [
  {
    id: '1',
    jobId: '1',
    userId: '1',
    status: 'pending',
    appliedAt: '2023-06-25T14:30:00Z',
    resume: 'https://example.com/resumes/john_doe.pdf'
  },
  {
    id: '2',
    jobId: '3',
    userId: '1',
    status: 'reviewed',
    appliedAt: '2023-06-28T09:15:00Z',
    resume: 'https://example.com/resumes/john_doe.pdf'
  }
]