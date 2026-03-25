import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReportByLocationId, getLocationById } from '../data/mockData';
import GradeBadge from '../components/ui/GradeBadge';
import KeywordPill from '../components/ui/KeywordPill';
import ReviewCard from '../components/ui/ReviewCard';
import SentimentPieChart from '../components/charts/SentimentPieChart';
import CategoryBarChart from '../components/charts/CategoryBarChart';
import ReviewVolumeChart from '../components/charts/ReviewVolumeChart';
import { LoadingScreen } from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-cream-50 rounded-xl border border-cream-300">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-medium text-charcoal-500 uppercase tracking-wider mb-1.5">
          Date Range
        </label>
        <select
          value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          className="select text-sm py-2"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="6m">Last 6 months</option>
          <option value="1y">Last year</option>
          <option value="all">All time</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-medium text-charcoal-500 uppercase tracking-wider mb-1.5">
          Platform
        </label>
        <select
          value={filters.platform}
          onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
          className="select text-sm py-2"
        >
          <option value="all">All Platforms</option>
          <option value="google">Google</option>
          <option value="yelp">Yelp</option>
          <option value="opentable">OpenTable</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-medium text-charcoal-500 uppercase tracking-wider mb-1.5">
          Rating
        </label>
        <select
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          className="select text-sm py-2"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2 Stars or less</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          onClick={() => setFilters({ dateRange: 'all', platform: 'all', rating: 'all' })}
          className="btn btn-ghost text-sm"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

function ChartCard({ title, children, className = '' }) {
  return (
    <div className={`bg-cream-50 rounded-xl border border-cream-300 p-5 ${className}`}>
      <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function PlatformBreakdown({ data }) {
  return (
    <div className="space-y-3">
      {data.map((platform) => (
        <div key={platform.platform} className="flex items-center gap-3">
          <span className="w-20 text-sm text-charcoal-600">{platform.platform}</span>
          <div className="flex-1 h-2 bg-charcoal-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-burgundy-900 rounded-full transition-all duration-500"
              style={{ width: `${platform.percentage}%` }}
            />
          </div>
          <span className="w-16 text-sm text-charcoal-600 text-right">
            {platform.reviews} ({platform.percentage}%)
          </span>
        </div>
      ))}
    </div>
  );
}

function StrengthsWeaknesses({ strengths, weaknesses }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="flex items-center gap-2 font-medium text-grade-a mb-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Strengths
        </h4>
        <ul className="space-y-2">
          {strengths.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-charcoal-700">
              <span className="w-1.5 h-1.5 rounded-full bg-grade-a mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="flex items-center gap-2 font-medium text-burgundy-900 mb-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Areas for Improvement
        </h4>
        <ul className="space-y-2">
          {weaknesses.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-charcoal-700">
              <span className="w-1.5 h-1.5 rounded-full bg-burgundy-900 mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReviewFilters({ reviewFilters, setReviewFilters, totalCount, filteredCount }) {
  const sentimentOptions = [
    { value: 'all', label: 'All' },
    { value: 'positive', label: 'Positive' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'negative', label: 'Negative' },
  ];

  const hasActiveFilters = reviewFilters.keyword || reviewFilters.sentiment !== 'all';

  return (
    <div className="bg-cream-50 rounded-xl border border-cream-300 p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Keyword search */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-charcoal-500 uppercase tracking-wider mb-1.5">
            Search Keywords
          </label>
          <div className="relative">
            <input
              type="text"
              value={reviewFilters.keyword}
              onChange={(e) => setReviewFilters({ ...reviewFilters, keyword: e.target.value })}
              placeholder="e.g., food, service, atmosphere..."
              className="input pl-10 text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {reviewFilters.keyword && (
              <button
                onClick={() => setReviewFilters({ ...reviewFilters, keyword: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Sentiment filter */}
        <div className="sm:w-auto">
          <label className="block text-xs font-medium text-charcoal-500 uppercase tracking-wider mb-1.5">
            Sentiment
          </label>
          <div className="flex rounded-lg border border-cream-400 overflow-hidden bg-cream-100">
            {sentimentOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setReviewFilters({ ...reviewFilters, sentiment: option.value })}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  reviewFilters.sentiment === option.value
                    ? option.value === 'positive'
                      ? 'bg-grade-a text-white'
                      : option.value === 'negative'
                      ? 'bg-burgundy-900 text-white'
                      : option.value === 'neutral'
                      ? 'bg-gold-500 text-white'
                      : 'bg-charcoal-900 text-white'
                    : 'text-charcoal-600 hover:bg-cream-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter status */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-300">
          <p className="text-sm text-charcoal-600">
            Showing <span className="font-semibold text-charcoal-900">{filteredCount}</span> of{' '}
            <span className="font-semibold text-charcoal-900">{totalCount}</span> reviews
            {reviewFilters.keyword && (
              <span className="ml-1">
                matching "<span className="font-medium text-burgundy-900">{reviewFilters.keyword}</span>"
              </span>
            )}
            {reviewFilters.sentiment !== 'all' && (
              <span className="ml-1">
                with <span className="font-medium">{reviewFilters.sentiment}</span> sentiment
              </span>
            )}
          </p>
          <button
            onClick={() => setReviewFilters({ keyword: '', sentiment: 'all' })}
            className="text-sm font-medium text-burgundy-900 hover:text-burgundy-700 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function LocationDetail() {
  const { locationId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [location, setLocation] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    platform: 'all',
    rating: 'all',
  });
  const [reviewFilters, setReviewFilters] = useState({
    keyword: '',
    sentiment: 'all',
  });

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      const reportData = getReportByLocationId(locationId);
      const locationData = getLocationById(locationId);
      setReport(reportData);
      setLocation(locationData);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [locationId]);

  // Filter reviews based on keyword and sentiment (must be before conditional returns)
  const filteredReviews = useMemo(() => {
    if (!report?.recentReviews) return [];

    const hasActiveFilters = reviewFilters.keyword || reviewFilters.sentiment !== 'all';

    if (!hasActiveFilters) {
      return report.recentReviews;
    }

    return report.recentReviews.filter((review) => {
      // Keyword filter - search in review text
      const keywordMatch = !reviewFilters.keyword ||
        review.text.toLowerCase().includes(reviewFilters.keyword.toLowerCase());

      // Sentiment filter
      const sentimentMatch = reviewFilters.sentiment === 'all' ||
        review.sentiment === reviewFilters.sentiment;

      return keywordMatch && sentimentMatch;
    });
  }, [report?.recentReviews, reviewFilters]);

  const hasActiveReviewFilters = reviewFilters.keyword || reviewFilters.sentiment !== 'all';

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-cream-300 border-t-burgundy-900 animate-spin mx-auto" />
          <p className="mt-4 text-charcoal-600">Loading report...</p>
        </div>
      </div>
    );
  }

  if (!report || !location) {
    return (
      <EmptyState
        icon={
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        title="Report not found"
        description="We couldn't find a report for this location. It may not have been analyzed yet."
        action={
          <Link to="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
        <Link to="/dashboard" className="text-charcoal-500 hover:text-charcoal-900 transition-colors">
          Dashboard
        </Link>
        <svg className="w-4 h-4 text-charcoal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-charcoal-900 font-medium">{location.name}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
        <div className="flex items-start gap-5">
          <GradeBadge grade={report.overallGrade} size="xl" />
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-900">
              {location.name}
            </h1>
            <p className="text-charcoal-600 mt-1">{location.cuisine}</p>
            <p className="text-sm text-charcoal-500 mt-1">{location.address}</p>
            <p className="text-xs text-charcoal-400 mt-2">
              Report period: {formatDate(report.startDate)} – {formatDate(report.endDate)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-secondary text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
          <button className="btn btn-primary text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export to PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {/* Summary */}
      <div className="bg-cream-50 rounded-xl border border-cream-300 p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
        <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-3">
          Executive Summary
        </h3>
        <p className="text-charcoal-700 leading-relaxed">
          {report.summary}
        </p>
        <div className="mt-6">
          <StrengthsWeaknesses strengths={report.strengths} weaknesses={report.weaknesses} />
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard
          title="Sentiment Breakdown"
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          <SentimentPieChart sentiment={report.sentiment} />
        </ChartCard>

        <ChartCard
          title="Category Scores"
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
        >
          <CategoryBarChart scores={report.categoryScores} />
          <div className="mt-4 pt-4 border-t border-cream-300">
            <h4 className="text-sm font-medium text-charcoal-600 mb-3">Platform Breakdown</h4>
            <PlatformBreakdown data={report.platformBreakdown} />
          </div>
        </ChartCard>
      </div>

      {/* Review volume chart */}
      <ChartCard
        title="Review Volume Over Time"
        className="opacity-0 animate-fade-in-up"
        style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
      >
        <ReviewVolumeChart data={report.reviewVolume} />
      </ChartCard>

      {/* Keywords */}
      <div className="bg-cream-50 rounded-xl border border-cream-300 p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
        <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-4">
          Top Keywords
        </h3>
        <div className="flex flex-wrap gap-2">
          {report.topKeywords.map((kw, index) => (
            <KeywordPill
              key={index}
              keyword={kw.word}
              count={kw.count}
              sentiment={kw.sentiment}
            />
          ))}
        </div>
      </div>

      {/* Reviews section with filters */}
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-semibold text-charcoal-900">
            {hasActiveReviewFilters ? 'Filtered Reviews' : 'Recent Reviews'}
          </h3>
          <span className="text-sm text-charcoal-500">
            {report.recentReviews.length} total reviews
          </span>
        </div>

        {/* Review filters */}
        <div className="mb-6">
          <ReviewFilters
            reviewFilters={reviewFilters}
            setReviewFilters={setReviewFilters}
            totalCount={report.recentReviews.length}
            filteredCount={filteredReviews.length}
          />
        </div>

        {/* Reviews list */}
        {filteredReviews.length > 0 ? (
          <div className="space-y-4">
            {filteredReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-cream-50 rounded-xl border border-cream-300 p-8">
            <EmptyState
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title="No matching reviews"
              description={
                reviewFilters.keyword
                  ? `No reviews found containing "${reviewFilters.keyword}"${reviewFilters.sentiment !== 'all' ? ` with ${reviewFilters.sentiment} sentiment` : ''}.`
                  : `No ${reviewFilters.sentiment} reviews found.`
              }
              action={
                <button
                  onClick={() => setReviewFilters({ keyword: '', sentiment: 'all' })}
                  className="btn btn-secondary"
                >
                  Clear filters
                </button>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
