› tree -I node_modules -L 6
.
├── Dockerfile
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
│   ├── assets
│   │   └── root-logos.png
│   ├── file.svg
│   ├── fonts
│   │   ├── edge-display
│   │   │   ├── EdgeDisplay-Bold.otf
│   │   │   ├── EdgeDisplay-Regular.otf
│   │   │   └── SIL Open Font License.txt
│   │   ├── proza
│   │   │   └── proza.ttf
│   │   ├── Satoshi
│   │   │   └── Satoshi-Variable.ttf
│   │   └── wellfleet
│   │       └── wellfleet.otf
│   └── logo
│       ├── Logo-32-dark.svg
│       ├── Logo-32-light.svg
│       ├── Logo-64-dark.svg
│       └── Logo-64-light.svg
├── README.md
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   ├── forgot-password
│   │   │   │   └── page.tsx
│   │   │   ├── login
│   │   │   │   └── page.tsx
│   │   │   ├── register
│   │   │   │   └── page.tsx
│   │   │   └── reset-password
│   │   │       └── page.tsx
│   │   ├── auth-callback
│   │   │   └── page.tsx
│   │   ├── env.d.ts
│   │   ├── error.tsx
│   │   ├── global.d.ts
│   │   ├── globals.css
│   │   ├── HomePageContent.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   └── routes.ts
│   ├── components
│   │   ├── auth
│   │   │   ├── LoginForm.tsx
│   │   │   ├── LogoutButton.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── UserProfile.tsx
│   │   ├── providers
│   │   │   ├── AuthGuard.tsx
│   │   │   ├── AuthProvider.tsx
│   │   │   └── ReduxProvider.tsx
│   │   └── ui
│   │       ├── BackButton.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Divider.tsx
│   │       ├── index.ts
│   │       ├── Input.tsx
│   │       ├── JobCard.tsx
│   │       ├── Modal.tsx
│   │       ├── NavigationButton.tsx
│   │       ├── Select.tsx
│   │       ├── Textarea.tsx
│   │       ├── ToastContainer.tsx
│   │       └── Toast.tsx
│   └── lib
│       ├── api
│       │   ├── authApi.ts
│       │   └── axiosConfig.ts
│       ├── hooks
│       │   ├── auth.ts
│       │   └── redux.ts
│       ├── services
│       │   └── tokenService.ts
│       ├── slices
│       │   └── authSlice.ts
│       └── store
│           ├── server-store.ts
│           └── store.ts
└── tsconfig.json

27 directories, 64 files
› cat src/app/page.tsx
'use client'
import './globals.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import HomePageContent from './HomePageContent';

export default function Home() {
  const [isExpanding, setIsExpanding] = useState(false);
  const [showHomepage, setShowHomepage] = useState(false);

  const startBlackHoleTransition = () => {
    setIsExpanding(true);
    setTimeout(() => setShowHomepage(true), 100);
  };

  return (
    <div className="min-h-screen bg-midnight-black overflow-hidden">
      <AnimatePresence>
        {!showHomepage ? (
          <motion.div
            className="flex flex-col items-center justify-center min-h-screen gap-12 p-4"
            initial={{ opacity: 1 }}
            animate={isExpanding ? {
              borderRadius: '100%',
              scale: 0,
              opacity: 0,
              transition: { duration: 1, ease: "easeInOut" }
            } : {}}
            onAnimationComplete={() => setIsExpanding(false)}
          >
            <motion.div
              className="text-center"
              initial={{ y: 0 }}
              animate={isExpanding ? { y: -50 } : {}}
            >
              <h1 className="text-heading-1 text-pure-white mb-6">
                Your search for the next dream job is over 🚀
              </h1>
              <p className="text-body text-light-gray mb-8">
                Discover thousands of job opportunities from top companies around the world.
                Tailor your search to find the perfect match for your skills and career goals.
              </p>

              <Button
                variant="primary"
                size="xl"
                onClick={startBlackHoleTransition}
              >
                Start Searching
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-4 gap-4 max-w-4xl"
              animate={isExpanding ? { scale: 0.8, opacity: 0 } : {}}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-32 bg-charcoal-gray rounded-2xl"
                  animate={isExpanding ? {
                    x: (i % 4 - 1.5) * 100,
                    y: (Math.floor(i/4) - 1.5) * 100,
                    scale: 0,
                    opacity: 0,
                    transition: { delay: i * 0.1, duration: 0.7 }
                  } : {}}
                />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <HomePageContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
› cat src/app/layout.tsx
// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import ReduxProvider from '@/components/providers/ReduxProvider';
import AuthProvider from '@/components/providers/AuthProvider';
// import ToastContainer from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'BerufPlattf - Job Search Platform',
  description: 'Find your dream job with our advanced job search platform',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <AuthProvider>
            {children}
            {/* <ToastContainer /> */}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}› cat src/app/\(auth\)/
forgot-password/ login/           register/        reset-password/
› cat src/app/\(auth\)/login/page.tsx
'use client';
import { LoginForm } from '@/components/auth/LoginForm';
import { BackButton } from '@/components/ui/BackButton';
import { Divider } from '@/components/ui/Divider';
import { useSearchParams } from 'next/navigation';
import { FiGithub, FiLinkedin, FiGoogle } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  const error = searchParams.get('error');

  const handleSocialLogin = (provider: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
  };

  return (
    <div className="page-container">
      <BackButton href="/" />

      <div className="mt-8 text-center">
        <h1 className="text-heading-1">Welcome Back</h1>
        <p className="text-body text-light-gray mt-2">
          Sign in to continue your job search
        </p>
      </div>

      {registered && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">
            Registration successful! Please sign in.
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            {error === 'unauthorized'
              ? 'You need to sign in to access this page'
              : 'An error occurred during authentication'}
          </p>
        </div>
      )}

      <div className="mt-8">
        <LoginForm />
      </div>

      <Divider />

      <div className="mt-4">
        <p className="text-center text-body text-light-gray mb-4">Or sign in with</p>

        <div className="flex justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleSocialLogin('google')}
            iconLeft={<FiGoogle className="text-charcoal-gray" />}
            className="flex-1"
          >
            Google
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleSocialLogin('linkedin')}
            iconLeft={<FiLinkedin className="text-charcoal-gray" />}
            className="flex-1"
          >
            LinkedIn
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleSocialLogin('github')}
            iconLeft={<FiGithub className="text-charcoal-gray" />}
            className="flex-1"
          >
            GitHub
          </Button>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-body text-light-gray">
          Don't have an account?{' '}
          <a href="/register" className="text-gold-sun hover:underline font-bold">
            Sign up
          </a>
        </p>
        <p className="text-body text-light-gray mt-2">
          <a href="/forgot-password" className="text-gold-sun hover:underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
}› ^C
› cat src/app/\(auth\)/re
register/       reset-password/
› cat src/app/\(auth\)/register/page.tsx
'use client';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { BackButton } from '@/components/ui/BackButton';
import { Divider } from '@/components/ui/Divider';

export default function RegisterPage() {
  return (
    <div className="page-container">
      <BackButton href="/" />

      <div className="mt-8 text-center">
        <h1 className="text-heading-1">Create Account</h1>
        <p className="text-body text-light-gray mt-2">
          Start your journey to finding the perfect job
        </p>
      </div>

      <div className="mt-8">
        <RegisterForm />
      </div>

      <Divider />

      <div className="text-center mt-4">
        <p className="text-body text-light-gray">
          Already have an account?{' '}
          <a href="/login" className="text-gold-sun hover:underline font-bold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}› ^C
› cat src/components/
auth/      providers/ ui/
› cat src/components/providers/
AuthGuard.tsx      AuthProvider.tsx   ReduxProvider.tsx
› cat src/components/providers/AuthGuard.tsx
// components/providers/AuthGuard.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks/redux';
import { selectIsAuthenticated, selectAuthLoading } from '@/lib/slices/authSlice';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  fallback,
  redirectTo = '/login'
}: AuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !loading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo, isClient]);

  // Show loading during SSR or while auth is loading
  if (!isClient || loading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show loading while redirecting
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}› cat src/components/providers/AuthProvider.tsx
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
}› ^C
› cat src/components/providers/
AuthGuard.tsx      AuthProvider.tsx   ReduxProvider.tsx
› cat src/components/providers/ReduxProvider.tsx
// components/providers/ReduxProvider.tsx
'use client';
import { useRef, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { makeStore, type AppStore } from '@/lib/store/store';

interface ReduxProviderProps {
  children: React.ReactNode;
  initialState?: any;
}

export default function ReduxProvider({ children, initialState }: ReduxProviderProps) {
  const storeRef = useRef<AppStore | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize store only once
  if (!storeRef.current) {
    storeRef.current = makeStore();

    // If we have initial state from server, preload it
    if (initialState) {
      storeRef.current.dispatch({ type: 'HYDRATE', payload: initialState });
    }
  }

  // Track client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const store = storeRef.current;

  // Only create persistor on client side
  const persistor = isClient ? persistStore(store) : null;

  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate
          loading={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
          persistor={persistor}
        >
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
}› ^C
› cat src/lib/
api/      hooks/    services/ slices/   store/
› cat src/lib/
cat: src/lib/: Is a directory
› cd src/lib/
› pwd
/home/plutonium/personal/BerufPlattf/frontend-next/src/lib
› #!/bin/bash

# Change this to your project root if needed
ROOT_DIR="."
IGNORE_DIRS="node_modules .next"

# Create find command excluding specified directories
FIND_CMD="find \"$ROOT_DIR\""
for dir in $IGNORE_DIRS; do
    FIND_CMD+=" -path \"$ROOT_DIR/$dir\" -prune -o"
done
FIND_CMD+=" -type f -print"

# Evaluate the command to get file list
eval "$FIND_CMD" | while IFS= read -r file; do
    echo "===================="
    echo "FILE: $file"
    echo "--------------------"
    cat "$file"
    echo -e "\n"
done
====================
FILE: ./api/authApi.ts
--------------------
import axios from 'axios';
import { axiosConfig } from './axiosConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const authApi = {
  register: async (email: string, password: string) => {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      { email, password },
      axiosConfig
    );
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      axiosConfig
    );
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await axios.post(
      `${API_URL}/auth/refresh-token`,
      { refreshToken },
      axiosConfig
    );
    return response.data;
  },

  logout: async (refreshToken: string) => {
    await axios.post(
      `${API_URL}/auth/logout`,
      { refreshToken },
      axiosConfig
    );
  },

  forgotPassword: async (email: string) => {
    const response = await axios.post(
      `${API_URL}/auth/forgot-password`,
      { email },
      axiosConfig
    );
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await axios.post(
      `${API_URL}/auth/reset-password`,
      { token, newPassword },
      axiosConfig
    );
    return response.data;
  },

  socialLogin: async (provider: string, code: string) => {
    const response = await axios.get(
      `${API_URL}/auth/${provider}/callback?code=${code}`,
      axiosConfig
    );
    return response.data;
  }
};

====================
FILE: ./api/axiosConfig.ts
--------------------
// lib/api/axiosConfig.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getStore } from '../store/store';
import { refreshAccessToken, logout } from '../slices/authSlice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const axiosConfig = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
axiosConfig.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only add token on client side
    if (typeof window !== 'undefined') {
      const store = getStore();
      const state = store.getState();
      const token = state.auth.accessToken;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosConfig.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    const store = getStore();
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;

    // If error is 401 and we haven't already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken &&
      originalRequest
    ) {
      originalRequest._retry = true;

      try {
        // Refresh the token
        const result = await store.dispatch(refreshAccessToken());

        if (refreshAccessToken.fulfilled.match(result)) {
          const newAccessToken = result.payload;

          // Update the request header
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          // Retry the original request
          return axiosConfig(originalRequest);
        } else {
          // Refresh failed, logout user
          store.dispatch(logout());
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // If refresh fails, logout the user
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;

====================
FILE: ./services/tokenService.ts
--------------------
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

====================
FILE: ./hooks/redux.ts
--------------------
// lib/hooks/redux.ts
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch, AppStore } from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<AppStore>();

====================
FILE: ./hooks/auth.ts
--------------------
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

====================
FILE: ./store/store.ts
--------------------
// lib/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';

// Create a storage function that handles SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Only use localStorage on client side
const storage = typeof window !== 'undefined'
  ? require('redux-persist/lib/storage').default
  : createNoopStorage();

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['refreshToken', 'user'], // Only persist these fields
  blacklist: ['isLoading', 'error'], // Don't persist loading states
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Global store instance for client-side
let store: AppStore | undefined;

export const getStore = () => {
  if (typeof window === 'undefined') {
    // Server-side: always create a new store
    return makeStore();
  }

  // Client-side: create store once and reuse
  if (!store) {
    store = makeStore();
  }
  return store;
};

====================
FILE: ./store/server-store.ts
--------------------
import { makeStore } from './store';

export const makeServerStore = () => {
  return makeStore();
};

export type ServerStore = ReturnType<typeof makeServerStore>;

====================
FILE: ./slices/authSlice.ts
--------------------
// lib/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store/store';
import { authApi } from '../api/authApi';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: string;
    email: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Async thunks
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const refreshToken = state.auth.refreshToken;

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authApi.refreshToken(refreshToken);
      return response.accessToken;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Token refresh failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.register(email, password);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(email, password);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const refreshToken = state.auth.refreshToken;

      if (refreshToken) {
        await authApi.logout(refreshToken);
      }

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }

      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{
      accessToken: string;
      refreshToken: string;
      user: { id: string; email: string };
    }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.error = null;
      state.isInitialized = true;

      // Sync to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    },

    clearError: (state) => {
      state.error = null;
    },

    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },

  extraReducers: (builder) => {
    builder
      // Handle hydration for SSR
      .addCase(HYDRATE as any, (state, action: any) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      })

      // Refresh token
      .addCase(refreshAccessToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isLoading = false;
        state.error = null;

        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', action.payload);
        }
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // Clear all auth data on refresh failure
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;

        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.user = action.payload.user;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;

        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // Still clear auth data even if logout API fails
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
      });
  },
});

export const { setCredentials, logout, clearError, setInitialized } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.accessToken;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;

export default authSlice.reducer;

›
