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