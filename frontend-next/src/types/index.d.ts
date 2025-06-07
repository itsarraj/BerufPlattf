// Auth types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'recruiter';
  company?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

// Job types
export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  salary: number;
  company: string;
  postedAt: string;
  skillsRequired: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
}

export interface JobsState {
  publicJobs: Job[];
  personalizedJobs: Job[];
  recruiterJobs: Job[];
  currentJob: Job | null;
  filters: {
    location: string;
    salary: [number, number];
    company: string;
    search: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  loading: boolean;
  error: string | null;
}

// Application types
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  resume: string;
  coverLetter?: string;
  jobTitle?: string;
  company?: string;
}

export interface ApplicationsState {
  applications: Application[];
  currentApplication: Application | null;
  loading: boolean;
  error: string | null;
}

// User types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: 'user' | 'recruiter';
  skills: string[];
  experience: string;
  education: string;
  company?: string;
}

export interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// UI types
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface Modal {
  isOpen: boolean;
  title: string;
  content: React.ReactNode | null;
}

export interface UIState {
  loading: boolean;
  modal: Modal;
  toasts: Toast[];
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'recruiter';
  };
}