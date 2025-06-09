'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';
import { authApi } from '@/lib/api/authApi';

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await authApi.forgotPassword(data.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="page-container">
        <BackButton href="/login" />

        <div className="mt-8 text-center">
          <h1 className="text-heading-1">Check Your Email</h1>
          <p className="text-body text-light-gray mt-4">
            We've sent instructions to reset your password to your email address.
            Please follow the link in the email to set a new password.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="mt-6"
            href="/login"
          >
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <BackButton href="/login" />

      <div className="mt-8 text-center">
        <h1 className="text-heading-1">Reset Password</h1>
        <p className="text-body text-light-gray mt-2">
          Enter your email to receive a password reset link
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Input
          label="Email Address"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors.email?.message}
        />

        <Button
          variant="primary"
          size="lg"
          type="submit"
          loading={isLoading}
          className="mt-6 w-full"
        >
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}