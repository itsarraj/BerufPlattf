'use client';
import { LoginForm } from '@/components/auth/LoginForm';
import { BackButton } from '@/components/ui/BackButton';
import { Divider } from '@/components/ui/Divider';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  return (
    <div className="page-container">
      <BackButton href="/" />

      <div className="mt-8 text-center">
        <h1 className="text-heading-1">Welcome Back</h1>
        <p className="text-body text-light-gray mt-2">
          Sign in to continue your job search
        </p>
      </div>

      {registered && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">
            Registration successful! Please sign in.
          </p>
        </div>
      )}

      <div className="mt-8">
        <LoginForm />
      </div>

      <Divider />

      <div className="text-center mt-4">
        <p className="text-body text-light-gray">
          Don't have an account?{' '}
          <a href="/register" className="text-gold-sun hover:underline font-bold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}