'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authApi } from '@/lib/api/authApi';
import { useRouter } from 'next/navigation';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await authApi.register(data.email, data.password);
      router.push('/login?registered=true');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

      <Input
        label="Password"
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
        className="mt-4"
      >
        Create Account
      </Button>
    </form>
  );
};