import storage from 'redux-persist/lib/storage'

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  version: 1,
  migrate: (state: any) => {
    // Migration logic for future versions
    return Promise.resolve(state)
  }
}