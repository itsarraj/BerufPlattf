// src/interfaces/user.ts
export interface User {
  id: number;
  role: 'user' | 'recruiter';
  company_id: number | null;
  name?: string;
  email?: string;
  resume_data?: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  resume_data?: string;
  created_at?: Date;
}

export interface RecruiterProfile extends UserProfile {
  company_id?: number;
}