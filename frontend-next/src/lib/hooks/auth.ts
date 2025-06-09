// lib/hooks/auth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from './redux';
import {
  selectIsAuthenticated,
  selectAccessToken,
  selectCurrentUser,
  selectAuthLoading,
  selectAuthError,
  selectIsInitialized,
  logoutUser
} from '../slices/authSlice';

export const useAuthGuard = (redirectPath = '/login') => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsInitialized);
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, isInitialized, router, redirectPath]);

  return { isAuthenticated, isInitialized };
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const user = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsInitialized);

  const logout = () => {
    dispatch(logoutUser());
  };

  return {
    accessToken,
    user,
    isLoading,
    error,
    isAuthenticated,
    isInitialized,
    logout,
  };
};

export const useRequireAuth = (redirectTo = '/login') => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isInitialized, router, redirectTo]);

  return { isAuthenticated, isInitialized };
};