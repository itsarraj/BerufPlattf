// lib/services/tokenService.ts
import { getStore } from '../store/store';
import { refreshAccessToken, logout } from '../slices/authSlice';

let refreshInterval: NodeJS.Timeout | null = null;

export const initializeTokenRefresh = () => {
  // Clear any existing interval
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  const checkTokenExpiration = async () => {
    if (typeof window === 'undefined') return;

    try {
      const store = getStore();
      const state = store.getState();
      const accessToken = state.auth.accessToken;

      if (!accessToken) return;

      // Decode JWT manually (simple base64 decode for payload)
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const expiresIn = payload.exp * 1000 - Date.now();

      // Refresh token 5 minutes before expiration
      if (expiresIn < 5 * 60 * 1000 && expiresIn > 0) {
        console.log('Token expiring soon, refreshing...');
        await store.dispatch(refreshAccessToken());
      } else if (expiresIn <= 0) {
        console.log('Token expired, logging out...');
        store.dispatch(logout());
      }
    } catch (error) {
      console.error('Error checking token expiration:', error);
      // If we can't decode the token, it's probably invalid
      const store = getStore();
      store.dispatch(logout());
    }
  };

  // Initial check
  checkTokenExpiration();

  // Check every minute
  refreshInterval = setInterval(checkTokenExpiration, 60 * 1000);

  // Return cleanup function
  return () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
  };
};

export const stopTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
};