import './globals.css';
import ReduxProvider from '@/components/providers/ReduxProvider';
import ToastContainer from '@/components/ui/ToastContainer';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { selectIsAuthenticated } from '@/lib/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check token validity on mount
    const checkAuth = async () => {
      // Add token refresh logic here
    };

    if (!isAuthenticated && !['/login', '/register'].includes(window.location.pathname)) {
      router.push('/login');
    }

    checkAuth();
  }, [isAuthenticated, router, dispatch]);

  return (
    <html lang="en">
      <body className="bg-dark-coal text-pure-white antialiased">
        <div className="min-h-screen flex flex-col">
          <ReduxProvider>
            {children}
            <ToastContainer />
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
