// src/components/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function AuthGuard({ role, children }: {
  role: 'user' | 'recruiter' | 'both';
  children: React.ReactNode;
}) {
  const { user, status } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (status === 'succeeded' && !user) {
      router.push('/auth/login');
    }
    if (user && role !== 'both' && user.role !== role) {
      router.push('/');
    }
  }, [user, status, role, router]);

  if (status === 'loading' || (user && role !== 'both' && user.role !== role)) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}