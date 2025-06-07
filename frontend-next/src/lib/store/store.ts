import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../slices/authSlice'
import userReducer from '../slices/userSlice'
import jobsReducer from '../slices/jobsSlice'
import applicationsReducer from '../slices/applicationsSlice'
import uiReducer from '../slices/uiSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  jobs: jobsReducer,
  applications: applicationsReducer,
  ui: uiReducer,
})

export const makeStore = () => {
  const isServer = typeof window === 'undefined'

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user'],
    // Disable persistence during SSR
    ...(isServer ? { storage: undefined } : {})
  }

  const persistedReducer = isServer
    ? rootReducer
    : persistReducer(persistConfig, rootReducer)

  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: isServer ? false : {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']