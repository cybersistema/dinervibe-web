import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-burgundy-900 to-burgundy-700 flex items-center justify-center shadow-lg">
        <svg className="w-7 h-7 text-cream-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <div>
        <h1 className="font-display text-2xl font-bold text-charcoal-900">DinerVibe</h1>
        <p className="text-sm text-charcoal-500 -mt-0.5">Review Analytics</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <div
      className="bg-cream-50/80 backdrop-blur-sm rounded-2xl p-6 border border-cream-300 shadow-sm opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="w-12 h-12 rounded-xl bg-burgundy-900/10 flex items-center justify-center text-burgundy-900 mb-4">
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold text-charcoal-900">{title}</h3>
      <p className="mt-2 text-charcoal-600 leading-relaxed">{description}</p>
    </div>
  );
}

function GradeDemo() {
  const grades = [
    { grade: 'A+', color: 'bg-grade-aplus' },
    { grade: 'A', color: 'bg-grade-a' },
    { grade: 'B+', color: 'bg-grade-bplus' },
    { grade: 'B', color: 'bg-grade-b' },
    { grade: 'C', color: 'bg-grade-c' },
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {grades.map((g, i) => (
        <div
          key={g.grade}
          className={`w-12 h-12 rounded-lg ${g.color} text-white font-display font-bold flex items-center justify-center shadow-lg opacity-0 animate-scale-in`}
          style={{ animationDelay: `${800 + i * 100}ms`, animationFillMode: 'forwards' }}
        >
          {g.grade}
        </div>
      ))}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    const success = await login();
    if (success) {
      navigate('/dashboard');
    }
    setIsSigningIn(false);
  };

  return (
    <div className="min-h-screen bg-cream-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-burgundy-900/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-burgundy-900/3 rounded-full blur-3xl" />
      </div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Navigation */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo />
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">Features</a>
              <a href="#" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">Pricing</a>
              <a href="#" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">About</a>
            </div>
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="btn btn-outline text-sm"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              Turn Reviews Into
              <span className="block text-gradient">Actionable Insights</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-charcoal-600 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              AI-powered sentiment analysis for restaurant owners. Understand your customers, improve your service, and grow your business.
            </p>

            {/* CTA Button */}
            <div className="mt-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              <button
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-charcoal-900 text-cream-50 rounded-xl font-medium text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSigningIn ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
              <p className="mt-4 text-sm text-charcoal-500">
                Free 14-day trial • No credit card required
              </p>
            </div>

            {/* Grade demo */}
            <div className="mt-16">
              <p className="text-sm font-medium text-charcoal-500 uppercase tracking-wider mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
                Get a letter grade for each location
              </p>
              <GradeDemo />
            </div>
          </div>
        </div>

        {/* Features section */}
        <section id="features" className="py-24 bg-cream-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900">
                Everything you need to understand your reviews
              </h2>
              <p className="mt-4 text-lg text-charcoal-600 max-w-2xl mx-auto">
                Powerful analytics tools designed specifically for restaurant owners and operators.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                delay={100}
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
                title="Sentiment Analysis"
                description="AI-powered analysis categorizes every review as positive, neutral, or negative with detailed breakdowns."
              />
              <FeatureCard
                delay={200}
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                }
                title="Category Scoring"
                description="Automatic scoring for Food, Service, Atmosphere, and Value based on what customers actually say."
              />
              <FeatureCard
                delay={300}
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
                title="Trend Tracking"
                description="Monitor review volume and sentiment over time to spot issues early and track improvements."
              />
              <FeatureCard
                delay={400}
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                title="Multi-Location Support"
                description="Manage all your restaurants from a single dashboard with location-by-location breakdowns."
              />
              <FeatureCard
                delay={500}
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                title="PDF Reports"
                description="Generate beautiful, branded reports to share with your team or investors with one click."
              />
              <FeatureCard
                delay={600}
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                }
                title="Multi-Platform"
                description="Aggregate reviews from Google, Yelp, OpenTable, and TripAdvisor in one unified view."
              />
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium text-charcoal-500 uppercase tracking-wider mb-6">
              Trusted by restaurant groups
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
              <span className="font-display text-2xl font-bold text-charcoal-400">Apicii Group</span>
              <span className="font-display text-2xl font-bold text-charcoal-400">Vertivine</span>
              <span className="font-display text-2xl font-bold text-charcoal-400">Urban Eats Co.</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-cream-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <Logo />
              <p className="text-sm text-charcoal-500">
                © 2025 DinerVibe. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-charcoal-500 hover:text-charcoal-900 transition-colors">Privacy</a>
                <a href="#" className="text-sm text-charcoal-500 hover:text-charcoal-900 transition-colors">Terms</a>
                <a href="#" className="text-sm text-charcoal-500 hover:text-charcoal-900 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
