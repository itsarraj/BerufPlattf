import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/lib/slices/authSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistReducer(authPersistConfig, authReducer),
      // Add other reducers here
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;