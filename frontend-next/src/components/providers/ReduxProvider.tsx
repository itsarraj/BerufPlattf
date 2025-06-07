'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { makeStore, AppStore } from '@/lib/store/store'

export default function ReduxProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  const persistorRef = useRef<any>(null)

  if (typeof window !== 'undefined' && !storeRef.current) {
    storeRef.current = makeStore()
    persistorRef.current = persistStore(storeRef.current)
  }

  return (
    <Provider store={storeRef.current!}>
      {persistorRef.current ? (
        <PersistGate loading={null} persistor={persistorRef.current}>
          {children}
        </PersistGate>
      ) : children}
    </Provider>
  )
}