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
}