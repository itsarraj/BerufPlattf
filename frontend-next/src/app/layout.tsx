import './globals.css';
import type { Metadata } from 'next';
import ReduxProvider from '@/components/providers/ReduxProvider';
import ToastContainer from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'BerufPlattf - Job Search Platform',
  description: 'Find your dream job with our advanced job search platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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