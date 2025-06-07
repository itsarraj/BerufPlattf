import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      iconLeft,
      iconRight,
      error,
      label,
      className = '',
      ...props
    },
    ref
  ) => {
    // Fixed background color and focus styles
    const baseClasses = [
      'flex items-center',
      'transition-all duration-150 ease-linear',
      'outline-none',
      'bg-charcoal-gray',
      'rounded-[var(--radius-lg)]',
      'focus-within:shadow-[var(--shadow-focus)]',
      error ? 'border border-red-fire' : '',
      className,
    ].join(' ');

    const sizeClasses = {
      sm: 'h-10 text-sm',
      md: 'h-12 text-base',
      lg: 'h-14 text-lg'
    }[size];

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <div className={`flex flex-col gap-1 ${widthClass}`}>
        {label && (
          <label className="font-normal text-sm text-pure-white">
            {label}
          </label>
        )}
        <div className={`relative ${baseClasses} ${sizeClasses}`}>
          {iconLeft && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full bg-transparent border-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none ${iconLeft ? 'pl-10' : 'pl-4'} ${iconRight ? 'pr-10' : 'pr-4'} active:translate-y-0.5 active:translate-x-0.5 active:shadow-none`}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {iconRight}
            </span>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-fire">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';