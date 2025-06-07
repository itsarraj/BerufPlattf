import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  iconLeft = <></>,
  iconRight = <></>,
  children = <></>,
  ...props
}) => {
  const baseClasses = [
    'font-bold',
    'font-edge-display',
    'rounded-lg',
    'px-4',
    'gap-2',
    'focus:outline-none',
    'hover:opacity-90',
    'active:scale-[0.98]',
    'inline-flex',
    'items-center',
    'justify-center',
    'transition-all',
    'duration-150',
    'shadow-[var(--shadow-button)]',
    'active:shadow-none',
    'active:translate-y-0.5',
    'active:translate-x-0.5'
  ].join(' ');

  const variantClasses = {
    primary: 'bg-gold-sun text-charcoal-gray',
    secondary: 'bg-charcoal-gray text-pure-white',
    outline: 'bg-transparent border border-charcoal-gray text-charcoal-gray',
    danger: 'bg-red-fire text-pure-white'
  }[variant];

  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg',
    xl: 'h-14 text-xl'
  }[size];

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = loading || props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const buttonClasses = [
    baseClasses,
    variantClasses,
    sizeClasses,
    widthClass,
    disabledClass
  ].join(' ');

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={buttonClasses}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="ml-2">{iconRight}</span>}
      {loading && <Spinner />}
    </button>
  );
}
);

const Spinner = () => (
  <svg
    className="ml-2 animate-spin h-5 w-5 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);