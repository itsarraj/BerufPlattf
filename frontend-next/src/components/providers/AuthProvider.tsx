// components/providers/AuthProvider.tsx
'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { selectAccessToken, selectRefreshToken, setCredentials } from '@/lib/slices/authSlice';
import { initializeTokenRefresh } from '@/lib/services/tokenService';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const refreshToken = useAppSelector(selectRefreshToken);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedUser = localStorage.getItem('user');

      // Only set credentials if we don't already have them in Redux
      if (storedAccessToken && storedRefreshToken && storedUser && !accessToken) {
        dispatch(setCredentials({
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
          user: JSON.parse(storedUser)
        }));
      }
    } catch (error) {
      console.error('Error loading auth from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }

    setIsInitialized(true);
  }, [dispatch, accessToken]);

  // Sync Redux state to localStorage
  useEffect(() => {
    if (!isInitialized) return;

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }, [accessToken, refreshToken, isInitialized]);

  // Initialize token refresh service
  useEffect(() => {
    if (!accessToken) return;

    const cleanup = initializeTokenRefresh();
    return cleanup;
  }, [accessToken]);

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}