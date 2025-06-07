// lib/hooks/useAuth.ts
import { useAppDispatch, useAppSelector } from './redux';
import { loginUser, logoutUser, refreshAccessToken } from '@/lib/slices/authSlice';
import { useEffect } from 'react';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      if (tokenExpiration && new Date() > new Date(tokenExpiration)) {
        dispatch(refreshAccessToken());
      }
    }
  }, [dispatch, accessToken]);


  // const login = (credentials: { email: string; password: string; type: 'user' | 'recruiter'; }) => {
  //   return dispatch(loginUser(credentials));
  // };

  // const logout = () => {
  //   dispatch(logoutUser());
  // };

  // const refreshToken = () => {
  //   return dispatch(refreshAccessToken());
  // };

  return {
    accessToken,
    refreshToken,
    login: (credentials: any) => dispatch(loginUser(credentials)),
    logout: () => dispatch(logoutUser()),
    refreshToken: () => dispatch(refreshAccessToken())
  };
}

