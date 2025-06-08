'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authApi } from '@/lib/api/authApi';
import { useAppDispatch } from '@/lib/hooks/redux';
import { setCredentials } from '@/lib/slices/authSlice';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await authApi.login(data.email, data.password);

      dispatch(setCredentials({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: { id: response.id, email: data.email }
      }));

      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Email Address"
        type="email"
        {...register('email', { required: 'Email is required' })}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        {...register('password', { required: 'Password is required' })}
        error={errors.password?.message}
      />

      <Button
        variant="primary"
        size="lg"
        type="submit"
        loading={isLoading}
        className="mt-4"
      >
        Sign In
      </Button>
    </form>
  );
};