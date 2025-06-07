'use client';

import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-coal text-pure-white container-padding">
      <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
        <div className="relative">
          <div className="absolute inset-0 bg-red-fire rounded-full blur-xl opacity-20 animate-pulse"></div>
          <FiAlertTriangle className="relative text-8xl text-red-fire mx-auto" />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-heading-1 font-bold">
            Oops! Something went wrong
          </h1>
          <p className="text-body text-light-gray">
            We encountered an unexpected error. Don't worry - our team has been notified and we're working on a fix.
          </p>
          <div className="mt-4 p-4 bg-charcoal-gray rounded-xl text-left">
            <code className="text-sm text-red-fire">
              {error.message}
            </code>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => reset()}
            iconRight={<FiRefreshCw className="animate-spin" />}
          >
            Try Again
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            Go to Home
          </Button>
        </div>

        <div className="mt-12 pt-6 border-t border-charcoal-gray-light w-full">
          <p className="text-sm text-light-gray">
            Still having trouble? <a href="mailto:support@berufplattf.com" className="text-gold-sun hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}