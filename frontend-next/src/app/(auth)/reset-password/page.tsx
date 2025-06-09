'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';
import { authApi } from '@/lib/api/authApi';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data: any) => {
    if (!token) return;

    try {
      setIsLoading(true);
      await authApi.resetPassword(token, data.password);
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
        <div className="text-center">
          <h1 className="text-heading-1">Password Updated</h1>
          <p className="text-body text-light-gray mt-4">
            Your password has been successfully updated. You can now sign in with your new password.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="mt-6"
            href="/login"
          >
            Sign In Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <BackButton href="/login" />

      <div className="mt-8 text-center">
        <h1 className="text-heading-1">Set New Password</h1>
        <p className="text-body text-light-gray mt-2">
          Create a new password for your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Input
          label="New Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
          error={errors.password?.message}
        />

        <Input
          label="Confirm Password"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
          error={errors.confirmPassword?.message}
        />

        <Button
          variant="primary"
          size="lg"
          type="submit"
          loading={isLoading}
          className="mt-6 w-full"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}