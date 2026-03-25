import { useState, useEffect, useMemo } from 'react';
import { gradeColors } from '../data/mockData';
import { useLocations } from '../context/LocationContext';
import StatCard from '../components/ui/StatCard';
import LocationCard from '../components/ui/LocationCard';
import { LoadingCard } from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

// Helper to calculate average grade
function calculateAverageGrade(locations) {
  const gradeValues = {
    'A+': 12, 'A': 11, 'A-': 10,
    'B+': 9, 'B': 8, 'B-': 7,
    'C+': 6, 'C': 5, 'C-': 4,
    'D': 3, 'F': 1,
  };
  const reverseGradeValues = Object.fromEntries(
    Object.entries(gradeValues).map(([k, v]) => [v, k])
  );

  const gradedLocations = locations.filter(loc => loc.overallGrade);
  if (gradedLocations.length === 0) return null;

  const avgValue = gradedLocations.reduce((sum, loc) => sum + gradeValues[loc.overallGrade], 0) / gradedLocations.length;
  const roundedValue = Math.round(avgValue);
  return reverseGradeValues[roundedValue] || 'B';
}

export default function Dashboard() {
  const { locations, openAddModal } = useLocations();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Compute stats from current locations
  const stats = useMemo(() => {
    const gradedLocations = locations.filter(loc => loc.overallGrade);
    const totalReviews = locations.reduce((sum, loc) => sum + (loc.totalReviews || 0), 0);
    const recentActivity = locations.reduce((sum, loc) => {
      const match = loc.recentActivity?.match(/\+(\d+)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }, 0);

    const avgSentiment = gradedLocations.length > 0 ? {
      positive: Math.round(gradedLocations.reduce((sum, loc) => sum + (loc.sentiment?.positive || 0), 0) / gradedLocations.length),
      neutral: Math.round(gradedLocations.reduce((sum, loc) => sum + (loc.sentiment?.neutral || 0), 0) / gradedLocations.length),
      negative: Math.round(gradedLocations.reduce((sum, loc) => sum + (loc.sentiment?.negative || 0), 0) / gradedLocations.length),
    } : { positive: 0, neutral: 0, negative: 0 };

    return {
      totalLocations: locations.length,
      averageGrade: calculateAverageGrade(locations),
      totalReviews,
      recentActivity,
      overallSentiment: avgSentiment,
    };
  }, [locations]);

  const gradeStyle = stats.averageGrade ? gradeColors[stats.averageGrade] : null;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-900">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-charcoal-600">
          Monitor all your locations at a glance
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Locations"
          value={stats.totalLocations}
          subtitle="Active restaurants"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          className="opacity-0 animate-fade-in-up stagger-1"
          style={{ animationFillMode: 'forwards' }}
        />
        <StatCard
          title="Average Grade"
          value={
            gradeStyle ? (
              <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg font-display font-bold ${gradeStyle.bg} ${gradeStyle.text}`}>
                {stats.averageGrade}
              </span>
            ) : (
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg font-display font-bold bg-charcoal-200 text-charcoal-500">
                --
              </span>
            )
          }
          subtitle="Across all locations"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
          className="opacity-0 animate-fade-in-up stagger-2"
          style={{ animationFillMode: 'forwards' }}
        />
        <StatCard
          title="Total Reviews"
          value={stats.totalReviews.toLocaleString()}
          subtitle="All time"
          trend={stats.recentActivity > 0 ? { type: 'up', value: `+${stats.recentActivity} this week` } : null}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          }
          className="opacity-0 animate-fade-in-up stagger-3"
          style={{ animationFillMode: 'forwards' }}
        />
        <StatCard
          title="Sentiment"
          value={stats.overallSentiment.positive > 0 ? `${stats.overallSentiment.positive}%` : '--'}
          subtitle="Positive reviews"
          trend={stats.overallSentiment.positive > 0 ? { type: 'up', value: '+3% vs last month' } : null}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          className="opacity-0 animate-fade-in-up stagger-4"
          style={{ animationFillMode: 'forwards' }}
        />
      </div>

      {/* Locations section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-charcoal-900">
            Your Locations
          </h2>
          <div className="flex items-center gap-3">
            <select className="select text-sm py-2">
              <option>Sort by: Last Analyzed</option>
              <option>Sort by: Name</option>
              <option>Sort by: Grade</option>
              <option>Sort by: Reviews</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : locations.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <LocationCard key={location.id} location={location} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-cream-50 rounded-xl border border-cream-300 p-8">
            <EmptyState
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              title="No locations yet"
              description="Add your first restaurant location to start tracking reviews and getting insights."
              action={
                <button onClick={openAddModal} className="btn btn-primary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Location
                </button>
              }
            />
          </div>
        )}
      </div>

      {/* Quick actions section */}
      <div className="bg-gradient-to-br from-burgundy-900 to-burgundy-800 rounded-2xl p-6 sm:p-8 text-cream-50 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-semibold">Ready to analyze?</h3>
            <p className="mt-1 text-cream-200">
              Run a fresh analysis to get the latest insights from your reviews.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-cream-50 text-burgundy-900 rounded-lg font-medium hover:bg-cream-100 transition-colors whitespace-nowrap">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Run Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
