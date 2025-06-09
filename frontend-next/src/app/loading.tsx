import { FiLoader } from 'react-icons/fi';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-coal text-pure-white">
      <div className="flex flex-col items-center gap-6">
        <FiLoader className="animate-spin text-gold-sun text-4xl" />
        <h2 className="text-heading-2 font-bold">Loading Application</h2>
        <p className="text-body text-light-gray text-center">
          Preparing your personalized job search experience
        </p>
        <div className="mt-4 w-64 h-2 bg-charcoal-gray rounded-full overflow-hidden">
          <div className="animate-pulse h-full bg-gold-sun w-1/2"></div>
        </div>
      </div>
    </div>
  );
}