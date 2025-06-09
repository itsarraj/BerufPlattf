import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  className = ''
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full m-4'
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-midnight-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleBackdropClick}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className={`
            relative
            bg-charcoal-gray
            rounded-[var(--radius-3xl)]
            shadow-[var(--shadow-modal)]
            w-full
            ${sizeClasses[size]}
            max-h-[90vh]
            overflow-hidden
            transform
            transition-all
            duration-300
            ${className}
          `}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-light-gray">
              {title && (
                <h2 className="text-xl font-bold text-pure-white">{title}</h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 text-light-gray hover:text-pure-white hover:bg-light-gray rounded-lg transition-colors duration-150"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  loading = false
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      closeOnBackdrop={!loading}
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-full ${
            variant === 'danger' ? 'bg-red-fire bg-opacity-20' : 'bg-gold-sun bg-opacity-20'
          }`}>
            {variant === 'danger' ? <WarningIcon /> : <QuestionIcon />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-pure-white">{title}</h3>
            <p className="text-light-gray text-sm mt-1">{message}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-secondary btn-md"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`btn-md ${variant === 'danger' ? 'bg-red-fire text-pure-white' : 'btn-primary'}`}
          >
            {loading ? 'Loading...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Alert Modal
interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  actionText?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  variant = 'info',
  actionText = 'OK'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return { bg: 'bg-success bg-opacity-20', icon: <CheckIcon /> };
      case 'error':
        return { bg: 'bg-red-fire bg-opacity-20', icon: <ErrorIcon /> };
      case 'warning':
        return { bg: 'bg-warning bg-opacity-20', icon: <WarningIcon /> };
      default:
        return { bg: 'bg-info bg-opacity-20', icon: <InfoIcon /> };
    }
  };

  const styles = getVariantStyles();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-full ${styles.bg}`}>
            {styles.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-pure-white">{title}</h3>
            <p className="text-light-gray text-sm mt-1">{message}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="btn-primary btn-md">
            {actionText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Icon components
const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QuestionIcon = () => (
  <svg className="w-6 h-6 text-gold-sun" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9 9.30019 14.8583 10.0203 14.5583 10.6766C14.2583 11.3329 13.7222 11.8782 13.05 12.2C12.52 12.46 12 13 12 14M12 17H12.01"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WarningIcon = () => (
  <svg className="w-6 h-6 text-red-fire" viewBox="0 0 24 24" fill="none">
    <path d="M12 9v4M12 17h.01M10.29 3.86l-8 14A1 1 0 0 0 3 19h18a1 1 0 0 0 .86-1.5l-8-14a1 1 0 0 0-1.72 0z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6 text-success" viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-6 h-6 text-red-fire" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M15 9l-6 6M9 9l6 6"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoIcon = () => (
  <svg className="w-6 h-6 text-info" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 16v-4M12 8h.01"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
