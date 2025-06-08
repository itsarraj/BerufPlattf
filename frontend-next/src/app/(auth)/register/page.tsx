'use client';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { BackButton } from '@/components/ui/BackButton';
import { Divider } from '@/components/ui/Divider';

export default function RegisterPage() {
  return (
    <div className="page-container">
      <BackButton href="/" />

      <div className="mt-8 text-center">
        <h1 className="text-heading-1">Create Account</h1>
        <p className="text-body text-light-gray mt-2">
          Start your journey to finding the perfect job
        </p>
      </div>

      <div className="mt-8">
        <RegisterForm />
      </div>

      <Divider />

      <div className="text-center mt-4">
        <p className="text-body text-light-gray">
          Already have an account?{' '}
          <a href="/login" className="text-gold-sun hover:underline font-bold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}