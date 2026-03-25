export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 rounded-full border-2 border-cream-300"></div>
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-burgundy-900 animate-spin"></div>
    </div>
  );
}

export function LoadingScreen({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen bg-cream-200 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto" />
        <p className="mt-4 text-charcoal-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-cream-50 rounded-xl border border-cream-300 p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-charcoal-200 rounded-xl"></div>
        <div className="flex-1">
          <div className="h-5 bg-charcoal-200 rounded w-3/4"></div>
          <div className="h-4 bg-charcoal-200 rounded w-1/2 mt-2"></div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <div className="h-3 bg-charcoal-200 rounded w-1/2"></div>
          <div className="h-5 bg-charcoal-200 rounded w-1/3 mt-2"></div>
        </div>
        <div>
          <div className="h-3 bg-charcoal-200 rounded w-1/2"></div>
          <div className="h-5 bg-charcoal-200 rounded w-1/3 mt-2"></div>
        </div>
      </div>
      <div className="mt-4 h-2 bg-charcoal-200 rounded-full"></div>
    </div>
  );
}
