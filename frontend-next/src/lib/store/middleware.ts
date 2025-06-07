import { Middleware } from '@reduxjs/toolkit'
import { RootState } from './store'
import { logoutUser, refreshAccessToken } from '../slices/authSlice';

const authMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  // Handle token expiration logic
  if (action.type.endsWith('/rejected') && action.payload?.status === 401) {
    // Attempt token refresh
    store.dispatch(refreshAccessToken())
      .then(() => {
        // Retry the original action after token refresh
        return store.dispatch(action)
      })
      .catch(() => {
        // Refresh failed, logout user
        store.dispatch(logoutUser())
      })
  }

  return next(action)
}

export const middleware = [authMiddleware]