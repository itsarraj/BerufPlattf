// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import ReduxProvider from '@/components/providers/ReduxProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import ProtectedLayout from './(protected)/layout';
// import ToastContainer from '@/components/ui/ToastContainer';


export const metadata: Metadata = {
  title: 'BerufPlattf - Job Search Platform',
  description: 'Find your dream job with our advanced job search platform',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <AuthProvider>
            <ProtectedLayout>
              {children}
            </ProtectedLayout>

            {/* <ToastContainer /> */}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}