'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAppDispatch } from '@/lib/hooks/redux';
import { loginUser } from '@/lib/slices/authSlice';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // This function receives form data from React Hook Form
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(result)) {
        onSuccess?.();
        // Optionally, redirect after login:
        // router.push('/dashboard');
      } else if (loginUser.rejected.match(result)) {
        setError(result.payload as string);
      }
    } catch (err) {
      setError('An unexpected error occurred');
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

      {error && <div className="text-red-500">{error}</div>}

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
