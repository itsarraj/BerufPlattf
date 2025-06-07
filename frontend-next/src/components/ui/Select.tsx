import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: { value: string; label: string; }[];
  label?: string;
  error?: string;
  fullWidth?: boolean | null ;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    options = [
      { value: 'default1', label: 'Default Option 1' },
      { value: 'default2', label: 'Default Option 2' },
    ],
    label = 'Choose an Option',
    error = '', fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="font-normal text-sm text-pure-white">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`input-default w-full appearance-none ${className}`}
            {...props}
          >
            <option value="">Pick an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
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

Select.displayName = 'Select';