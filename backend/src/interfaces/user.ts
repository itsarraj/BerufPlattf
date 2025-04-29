// src/interfaces/user.ts
export interface User {
  id: number;
  role: 'user' | 'recruiter';
  company_id: number | null;
}