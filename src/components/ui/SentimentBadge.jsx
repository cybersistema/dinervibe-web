export default function SentimentBadge({ sentiment, className = '' }) {
  const styles = {
    positive: 'bg-grade-a/10 text-grade-a border-grade-a/20',
    neutral: 'bg-gold-500/10 text-gold-700 border-gold-500/20',
    negative: 'bg-burgundy-900/10 text-burgundy-900 border-burgundy-900/20',
  };

  const labels = {
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[sentiment]} ${className}`}
    >
      {labels[sentiment]}
    </span>
  );
}
