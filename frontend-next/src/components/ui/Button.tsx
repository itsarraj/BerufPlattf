import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconOnly?: ReactNode; // For icon-only buttons
  shape?: 'default' | 'round' | 'square';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  iconLeft,
  iconRight,
  iconOnly,
  shape = 'default',
  children,
  className = '',
  ...props
}, ref) => {
  const isIconOnly = Boolean(iconOnly);

  const baseClasses = [
    'font-bold',
    'font-edge-display',
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
  ];

  // Shape classes
  const shapeClasses = {
    default: 'rounded-lg px-4 gap-2',
    round: 'rounded-full',
    square: 'rounded-lg'
  };

  // For icon-only buttons, we need different padding
  if (isIconOnly) {
    shapeClasses.round += ' p-2';
    shapeClasses.square += ' p-2';
    baseClasses.push('aspect-square');
  } else {
    baseClasses.push('gap-2');
  }

  const variantClasses = {
    primary: 'bg-gold-sun text-charcoal-gray hover:bg-gold-sun-hover',
    secondary: 'bg-charcoal-gray text-pure-white hover:bg-charcoal-gray-hover',
    outline: 'bg-transparent border border-charcoal-gray text-pure-white hover:bg-charcoal-gray',
    danger: 'bg-red-fire text-pure-white hover:bg-opacity-90',
    icon: 'bg-transparent text-pure-white hover:bg-charcoal-gray'
  }[variant];

  const sizeClasses = {
    sm: isIconOnly ? 'h-8 w-8 text-sm' : 'h-8 text-sm px-3',
    md: isIconOnly ? 'h-10 w-10 text-base' : 'h-10 text-base px-4',
    lg: isIconOnly ? 'h-12 w-12 text-lg' : 'h-12 text-lg px-6',
    xl: isIconOnly ? 'h-14 w-14 text-xl' : 'h-14 text-xl px-8'
  }[size];

  const widthClass = fullWidth && !isIconOnly ? 'w-full' : '';
  const disabledClass = loading || props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const buttonClasses = [
    ...baseClasses,
    shapeClasses[shape],
    variantClasses,
    sizeClasses,
    widthClass,
    disabledClass,
    className
  ].join(' ');

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={buttonClasses}
    >
      {loading && <Spinner />}
      {!loading && (
        <>
          {iconOnly ? (
            iconOnly
          ) : (
            <>
              {iconLeft && <span>{iconLeft}</span>}
              {children && <span>{children}</span>}
              {iconRight && <span>{iconRight}</span>}
            </>
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-current"
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