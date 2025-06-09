import React from 'react';
import Link from 'next/link';

interface NavigationButtonProps {
  href: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  label?: string;
  variant?: 'default' | 'minimal' | 'button';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  href,
  direction = 'left',
  label,
  variant = 'default',
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const ArrowIcon = () => {
    const iconSize = {
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-8 h-8'
    }[size];

    const arrows = {
      left: (
        <svg className={iconSize} viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      right: (
        <svg className={iconSize} viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      up: (
        <svg className={iconSize} viewBox="0 0 24 24" fill="none">
          <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      down: (
        <svg className={iconSize} viewBox="0 0 24 24" fill="none">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    };

    return arrows[direction];
  };

  const getVariantClasses = () => {
    const sizeClasses = {
      sm: showLabel ? 'text-sm gap-1' : 'p-2',
      md: showLabel ? 'text-base gap-2' : 'p-3',
      lg: showLabel ? 'text-lg gap-3' : 'p-4'
    };

    switch (variant) {
      case 'minimal':
        return `text-gold-sun hover:text-gold-sun-hover transition-colors duration-150 ${sizeClasses[size]}`;

      case 'button':
        return `
          bg-charcoal-gray text-pure-white rounded-lg
          hover:bg-charcoal-gray-hover
          shadow-[var(--shadow-button)]
          hover:shadow-[var(--shadow-button-hover)]
          active:shadow-none active:translate-y-0.5 active:translate-x-0.5
          transition-all duration-150
          ${sizeClasses[size]}
          ${showLabel ? 'px-4 py-2' : ''}
        `;

      default:
        return `
          text-gold-sun hover:text-gold-sun-hover
          hover:bg-old-sun-10 rounded-lg
          transition-all duration-150
          ${sizeClasses[size]}
          ${showLabel ? 'px-3 py-2' : ''}
        `;
    }
  };

  const displayLabel = label || (direction === 'left' ? 'Back' :
                                 direction === 'right' ? 'Next' :
                                 direction === 'up' ? 'Up' : 'Down');

  return (
    <Link
      href={href}
      className={`
        inline-flex items-center justify-center
        font-normal
        ${getVariantClasses()}
        ${className}
      `}
    >
      {direction === 'right' && showLabel && <span>{displayLabel}</span>}
      {direction === 'down' && showLabel && <span>{displayLabel}</span>}

      <ArrowIcon />

      {direction === 'left' && showLabel && <span>{displayLabel}</span>}
      {direction === 'up' && showLabel && <span>{displayLabel}</span>}
    </Link>
  );
};

// Predefined common navigation buttons
export const BackButton: React.FC<Omit<NavigationButtonProps, 'direction'>> = (props) => (
  <NavigationButton {...props} direction="left" />
);

export const NextButton: React.FC<Omit<NavigationButtonProps, 'direction'>> = (props) => (
  <NavigationButton {...props} direction="right" />
);

export const UpButton: React.FC<Omit<NavigationButtonProps, 'direction'>> = (props) => (
  <NavigationButton {...props} direction="up" />
);

export const DownButton: React.FC<Omit<NavigationButtonProps, 'direction'>> = (props) => (
  <NavigationButton {...props} direction="down" />
);