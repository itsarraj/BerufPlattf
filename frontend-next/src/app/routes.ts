import { redirect } from 'next/navigation';

export const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/auth-callback'
];

export const authRoutes = [
  '/login',
  '/register'
];

export const protectedRoutes = [
  '/dashboard',
  '/settings',
  '/profile',
  '/jobs'
];

export const DEFAULT_LOGIN_REDIRECT = '/dashboard';