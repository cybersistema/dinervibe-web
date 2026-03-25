import { Link } from 'react-router-dom';
import GradeBadge from './GradeBadge';

function SentimentBar({ positive, neutral, negative }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-charcoal-100 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-grade-a transition-all duration-500"
          style={{ width: `${positive}%` }}
        />
        <div
          className="h-full bg-gold-500 transition-all duration-500"
          style={{ width: `${neutral}%` }}
        />
        <div
          className="h-full bg-burgundy-900 transition-all duration-500"
          style={{ width: `${negative}%` }}
        />
      </div>
    </div>
  );
}

export default function LocationCard({ location, index = 0 }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className="group bg-cream-50 rounded-xl border border-cream-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          <GradeBadge grade={location.overallGrade} size="md" />
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-bold text-charcoal-900 truncate">
              {location.name}
            </h3>
            <p className="text-sm text-charcoal-500">{location.cuisine}</p>
            <p className="text-xs text-charcoal-400 mt-1 truncate">{location.address}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wider">Reviews</p>
            <p className="text-lg font-semibold text-charcoal-900">{location.totalReviews}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wider">Activity</p>
            <p className="text-lg font-semibold text-grade-a">{location.recentActivity}</p>
          </div>
        </div>

        {/* Sentiment bar */}
        <div className="mt-4">
          <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wider mb-2">Sentiment</p>
          <SentimentBar
            positive={location.sentiment.positive}
            neutral={location.sentiment.neutral}
            negative={location.sentiment.negative}
          />
          <div className="flex justify-between mt-1.5 text-xs text-charcoal-500">
            <span>{location.sentiment.positive}% positive</span>
            <span>{location.sentiment.negative}% negative</span>
          </div>
        </div>

        {/* Last analyzed */}
        <p className="mt-4 text-xs text-charcoal-400">
          Last analyzed: {formatDate(location.lastAnalyzed)}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-cream-100 border-t border-cream-300">
        <Link
          to={`/dashboard/location/${location.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-burgundy-900 hover:text-burgundy-700 transition-colors"
        >
          View Report
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
