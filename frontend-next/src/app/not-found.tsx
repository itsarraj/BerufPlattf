import Link from 'next/link';
import { FiArrowLeft, FiFrown } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-coal text-pure-white container-padding">
      <div className="flex flex-col items-center gap-8 text-center ">
        <div className="relative">
          <div className="absolute inset-0 bg-gold-sun rounded-full blur-xl opacity-20 animate-pulse"></div>
          <FiFrown className="relative text-8xl text-gold-sun mx-auto" />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-heading-1 font-bold text-gradient">
            Page Not Found
          </h1>
          <p className="text-body text-light-gray">
            The page you're looking for doesn't exist or has been moved.
            Don't worry though - we'll help you get back on track.
          </p>
        </div>

        <div className="mt-6">
          <Link href="/">
            <Button
              variant="primary"
              size="lg"
              iconLeft={<FiArrowLeft className="text-charcoal-gray" />}
            >
              Return to Homepage
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-6 border-t border-charcoal-gray-light w-full">
          <p className="text-sm text-light-gray">
            Need help? <a href="mailto:support@berufplattf.com" className="text-gold-sun hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}