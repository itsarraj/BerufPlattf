import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'hover' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'lg',
  className = '',
  onClick
}) => {
  const baseClasses = [
    'bg-charcoal-gray',
    'rounded-[var(--radius-3xl)]',
    'transition-all',
    'duration-150',
    'ease-linear'
  ];

  const variantClasses = {
    default: '',
    hover: 'hover:bg-charcoal-gray-hover hover:shadow-[var(--shadow-card)] cursor-pointer',
    elevated: 'shadow-[var(--shadow-card)]',
    bordered: 'border border-light-gray'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const cardClasses = [
    ...baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className
  ].join(' ');

  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick}
    >
      {children}
    </CardComponent>
  );
};

// Specialized card components
interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: string;
  description: string;
  tags: string[];
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onClick?: () => void;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  type,
  description,
  tags,
  isBookmarked = false,
  onBookmark,
  onClick,
  className = ''
}) => {
  return (
    <Card variant="hover" onClick={onClick} className={className}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-pure-white mb-1">{title}</h3>
            <p className="text-gold-sun font-medium">{company}</p>
          </div>
          {onBookmark && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark();
              }}
              className="p-2 hover:bg-light-gray rounded-lg transition-colors duration-150"
            >
              <svg
                className={`w-5 h-5 ${isBookmarked ? 'fill-gold-sun text-gold-sun' : 'text-light-gray'}`}
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-wrap gap-4 text-sm text-light-gray">
          <span className="flex items-center gap-1">
            <LocationIcon />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <TypeIcon />
            {type}
          </span>
          {salary && (
            <span className="flex items-center gap-1">
              <SalaryIcon />
              {salary}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-light-gray text-sm line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-dark-gray text-pure-white text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className = ''
}) => {
  return (
    <Card variant="elevated" className={className}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-light-gray text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-pure-white mb-1">{value}</p>
          {subtitle && (
            <p className="text-light-gray text-xs">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs ${
              trend.isPositive ? 'text-success' : 'text-error'
            }`}>
              {trend.isPositive ? <TrendUpIcon /> : <TrendDownIcon />}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-gold-sun">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

// Icon components used in cards
const LocationIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const TypeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SalaryIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendDownIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
    <path d="M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 17H7V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);