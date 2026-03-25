export default function KeywordPill({ keyword, count, sentiment = 'positive', className = '' }) {
  const styles = {
    positive: 'bg-grade-a/5 text-grade-a border-grade-a/20 hover:bg-grade-a/10',
    neutral: 'bg-gold-500/5 text-gold-700 border-gold-500/20 hover:bg-gold-500/10',
    negative: 'bg-burgundy-900/5 text-burgundy-900 border-burgundy-900/20 hover:bg-burgundy-900/10',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-default ${styles[sentiment]} ${className}`}
    >
      {keyword}
      {count && (
        <span className="text-xs opacity-60">({count})</span>
      )}
    </span>
  );
}
