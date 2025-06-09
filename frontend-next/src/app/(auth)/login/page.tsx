'use client';
import { LoginForm } from '@/components/auth/LoginForm';
import { BackButton } from '@/components/ui/BackButton';
import { Divider } from '@/components/ui/Divider';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaGoogle as FiGoogle} from "react-icons/fa";
import { FiGithub, FiLinkedin  } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { DEFAULT_LOGIN_REDIRECT } from '../../routes';


export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  const error = searchParams.get('error');
  const redirectTo = searchParams.get('redirect') || DEFAULT_LOGIN_REDIRECT;

  const handleSocialLogin = (provider: string) => {
    localStorage.setItem('login_redirect', redirectTo);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
  };

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

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            {error === 'unauthorized'
              ? 'You need to sign in to access this page'
              : 'An error occurred during authentication'}
          </p>
        </div>
      )}

      <div className="mt-8">
        <LoginForm
          onSuccess={() => router.push(redirectTo)}
        />
      </div>

      <Divider />

      <div className="mt-4">
        <p className="text-center text-body text-light-gray mb-4">Or sign in with</p>

        <div className="flex justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleSocialLogin('google')}
            iconLeft={<FiGoogle className="text-charcoal-gray" />}
            className="flex-1"
          >
            Google
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleSocialLogin('linkedin')}
            iconLeft={<FiLinkedin className="text-charcoal-gray" />}
            className="flex-1"
          >
            LinkedIn
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleSocialLogin('github')}
            iconLeft={<FiGithub className="text-charcoal-gray" />}
            className="flex-1"
          >
            GitHub
          </Button>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-body text-light-gray">
          Don't have an account?{' '}
          <a href="/register" className="text-gold-sun hover:underline font-bold">
            Sign up
          </a>
        </p>
        <p className="text-body text-light-gray mt-2">
          <a href="/forgot-password" className="text-gold-sun hover:underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
}