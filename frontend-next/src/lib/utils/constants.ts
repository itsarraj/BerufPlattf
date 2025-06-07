export const JOB_TYPES = [
  'full-time',
  'part-time',
  'contract',
  'freelance',
  'internship'
] as const

export const EXPERIENCE_LEVELS = [
  'entry',
  'mid',
  'senior',
  'executive'
] as const

export const APPLICATION_STATUSES = [
  'pending',
  'reviewed',
  'accepted',
  'rejected'
] as const

export const USER_ROLES = [
  'user',
  'recruiter'
] as const

export const SALARY_RANGES = [
  { label: 'Under $20,000', value: [0, 20000] },
  { label: '$20,000 - $40,000', value: [20000, 40000] },
  { label: '$40,000 - $60,000', value: [40000, 60000] },
  { label: '$60,000 - $80,000', value: [60000, 80000] },
  { label: '$80,000 - $100,000', value: [80000, 100000] },
  { label: 'Over $100,000', value: [100000, 200000] },
]

export const JOB_CATEGORIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Marketing',
  'Design',
  'Sales',
  'Customer Service',
  'Human Resources',
  'Engineering'
]

export const SKILLS_LIST = [
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'CSS',
  'HTML',
  'SQL',
  'AWS',
  'Docker',
  'Kubernetes',
  'Git',
  'TypeScript',
  'Angular',
  'Vue.js',
  'PHP',
  'Ruby',
  'C#',
  'Swift',
  'Go',
  'Rust',
  'Machine Learning',
  'Data Analysis',
  'Project Management',
  'Agile',
  'Scrum',
  'UI/UX Design',
  'Graphic Design',
  'Content Writing',
  'Digital Marketing',
  'SEO',
  'Social Media',
  'Networking',
  'Cybersecurity',
  'DevOps',
  'Cloud Computing',
  'Blockchain',
  'AI',
  'Big Data',
  'Mobile Development',
  'Web Development',
  'Backend Development',
  'Frontend Development',
  'Full Stack Development',
  'Quality Assurance',
  'Testing',
  'Database Administration',
  'System Administration',
  'IT Support',
  'Technical Writing',
  'Product Management',
  'Business Analysis',
  'Salesforce',
  'ERP',
  'CRM',
  'Microsoft Office',
  'Excel',
  'PowerPoint',
  'Word'
]