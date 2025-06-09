'use client';
import { AuthGuard } from '@/components/providers/AuthGuard';
import { usePathname } from 'next/navigation';
import { protectedRoutes } from '../routes';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route));

  return isProtectedRoute ? (
    <AuthGuard fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      {children}
    </AuthGuard>
  ) : children;
}