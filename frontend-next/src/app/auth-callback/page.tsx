'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks/redux';
import { loginUser } from '@/lib/slices/authSlice';
import { DEFAULT_LOGIN_REDIRECT } from '../routes';

export default function AuthCallbackPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const provider = window.location.pathname.split('/')[2]; // /auth-callback/google

        if (code && provider) {
          // Dispatch social login action
          const result = await dispatch(loginUser({ provider, code }));

          if (loginUser.fulfilled.match(result)) {
            const redirectUrl = localStorage.getItem('login_redirect') || DEFAULT_LOGIN_REDIRECT;
            localStorage.removeItem('login_redirect');
            router.push(redirectUrl);
          }
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        router.push('/login?error=authentication_failed');
      }
    };

    authenticate();
  }, [dispatch, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}