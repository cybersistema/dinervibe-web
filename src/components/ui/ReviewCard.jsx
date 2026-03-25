import SentimentBadge from './SentimentBadge';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-gold-500' : 'text-charcoal-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function SourceBadge({ source }) {
  const colors = {
    Google: 'bg-blue-50 text-blue-700 border-blue-200',
    Yelp: 'bg-red-50 text-red-700 border-red-200',
    OpenTable: 'bg-orange-50 text-orange-700 border-orange-200',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[source] || 'bg-charcoal-50 text-charcoal-700 border-charcoal-200'}`}>
      {source}
    </span>
  );
}

export default function ReviewCard({ review, index = 0 }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className="bg-cream-50 rounded-xl border border-cream-300 p-5 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-burgundy-900 to-burgundy-700 flex items-center justify-center text-cream-50 font-medium">
            {review.reviewer.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-charcoal-900">{review.reviewer}</p>
            <p className="text-xs text-charcoal-500">{formatDate(review.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SourceBadge source={review.source} />
          <SentimentBadge sentiment={review.sentiment} />
        </div>
      </div>

      {/* Rating */}
      <div className="mt-3">
        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="mt-3 text-charcoal-700 leading-relaxed">
        {review.text}
      </p>
    </div>
  );
}
