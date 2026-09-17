import React from 'react';
import { User } from 'firebase/auth';
import { ModuleData, ViewType } from '../types.ts';
import { ModuleCard } from './ModuleCard.tsx';
import { ProgressBar } from './ProgressBar.tsx';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Flame,
  Cloud,
  ListCheck,
  LogIn,
} from 'lucide-react';

interface DashboardViewProps {
  modules: ModuleData[];
  moduleStats: Record<number, { completed: number; total: number; percent: number; isDone: boolean }>;
  overallStats: { completed: number; total: number; percent: number; isAllCompleted: boolean };
  onNavigate: (view: ViewType) => void;
  onOpenResetModal: () => void;
  user: User | null;
  onSignIn: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  modules,
  moduleStats,
  overallStats,
  onNavigate,
  user,
  onSignIn,
}) => {
  // Find the next incomplete module
  const nextIncompleteModule = modules.find((m) => !moduleStats[m.id]?.isDone) || modules[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12">
      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold tracking-wide shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Positive Psychology Rewiring Curriculum</span>
        </div>

        <h1
          id="hero-header-title"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight"
        >
          The Science of Well-Being
        </h1>

        <p id="hero-header-subtitle" className="text-lg sm:text-xl font-medium text-stone-600">
          4-Week Daily Action Plan
        </p>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Translate the science of happiness into tangible, daily micro-habits. Complete two
          evidence-based practices each day across 28 days to build lasting emotional resilience and joy.
        </p>
      </section>

      {/* Cloud Sync Status Banner / Sign-in Callout */}
      {!user ? (
        <div
          id="cloud-signin-banner"
          className="rounded-2xl border border-teal-200/80 bg-teal-50/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-stone-50 flex items-center justify-center shrink-0">
              <Cloud className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">
                Cloud Firestore Synchronization
              </h4>
              <p className="text-xs text-stone-600">
                Sign in with Google to securely save and access your progress across all your devices.
              </p>
            </div>
          </div>

          <button
            type="button"
            id="banner-google-signin-btn"
            onClick={onSignIn}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-teal-800 text-white font-semibold text-xs hover:bg-teal-900 transition-colors shadow-2xs self-start sm:self-auto shrink-0"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign in with Google</span>
          </button>
        </div>
      ) : (
        <div
          id="cloud-synced-banner"
          className="rounded-2xl border border-stone-200 bg-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs text-xs"
        >
          <div className="flex items-center gap-2 text-stone-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Cloud className="w-4 h-4 text-teal-700" />
            <span>
              Connected to Cloud Firestore as{' '}
              <strong className="text-stone-900 font-semibold">{user.displayName || user.email}</strong>
            </span>
          </div>

          <button
            type="button"
            id="dashboard-view-completed-btn"
            onClick={() => onNavigate('completed')}
            className="inline-flex items-center gap-1.5 font-semibold text-teal-800 hover:text-teal-900 self-start sm:self-auto"
          >
            <ListCheck className="w-4 h-4" />
            <span>View Completed Activities ({overallStats.completed})</span>
          </button>
        </div>
      )}

      {/* Overall Progress Banner */}
      <section
        id="overall-progress-card"
        className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
              <Award className="w-4 h-4 text-teal-600" />
              <span>Overall Progress</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <span
                id="overall-completed-text"
                className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums"
              >
                {overallStats.completed} / {overallStats.total}
              </span>
              <span className="text-sm sm:text-base text-stone-600 font-medium">
                Activities Completed
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600">
              {overallStats.isAllCompleted
                ? 'All 56 activities completed! You have finished the full 4-week rewiring program.'
                : overallStats.completed === 0
                ? 'Begin your journey today with Day 1 of Module 1.'
                : `${overallStats.total - overallStats.completed} activities remaining across your 28-day plan.`}
            </p>
          </div>

          {/* Large percentage display & Continue CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-center min-w-[110px]">
              <div
                id="overall-percent-text"
                className="text-2xl sm:text-3xl font-bold text-teal-800 tabular-nums"
              >
                {overallStats.percent}%
              </div>
              <div className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                Complete
              </div>
            </div>

            <button
              type="button"
              id="resume-program-btn"
              onClick={() => onNavigate(`module-${nextIncompleteModule.id}` as ViewType)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-800 text-white font-semibold text-sm hover:bg-teal-900 transition-colors shadow-xs"
            >
              <span>
                {overallStats.completed === 0
                  ? 'Start Week 1'
                  : overallStats.isAllCompleted
                  ? 'Review Program'
                  : `Continue Module ${nextIncompleteModule.id}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="mt-6 pt-6 border-t border-stone-100">
          <ProgressBar
            id="dashboard-overall-progressbar"
            value={overallStats.percent}
            heightClass="h-3"
            colorClass={overallStats.isAllCompleted ? 'bg-emerald-600' : 'bg-teal-600'}
          />
        </div>
      </section>

      {/* 4 Module Cards Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              The 4 Modules
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Select a module to view its 7-day schedule, daily practices, and detailed instructions.
            </p>
          </div>

          <div className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1 rounded-full self-start sm:self-auto">
            4 Weeks · 28 Days · 56 Habits
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const stats = moduleStats[module.id] || { completed: 0, total: 14, percent: 0, isDone: false };
            return (
              <ModuleCard
                key={module.id}
                module={module}
                completedCount={stats.completed}
                totalCount={stats.total}
                onSelect={(modId) => onNavigate(`module-${modId}` as ViewType)}
              />
            );
          })}
        </div>
      </section>

      {/* Program Principles / Scientific Insight Section */}
      <section className="rounded-2xl border border-stone-200 bg-stone-100/50 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span>About the Rewirement Practice</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-stone-900">
          Why "Rewirements" Work
        </h3>
        <p className="text-sm text-stone-700 leading-relaxed">
          The human brain naturally succumbs to <em>hedonic adaptation</em>—we quickly get used to positive
          changes and return to baseline happiness. Scientific "rewirements" are deliberate psychological
          and behavioral practices designed to overcome cognitive biases. By savoring, practicing
          gratitude, connecting with others, and prioritizing physical wellness, you form neurological pathways
          that sustainably raise life satisfaction.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white rounded-xl p-4 border border-stone-200/80">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Small Daily Steps</span>
            </div>
            <p className="text-xs text-stone-600 leading-normal">
              Just two micro-habits per day (5–20 minutes) ensure consistency without cognitive overload.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200/80">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Evidence-Based</span>
            </div>
            <p className="text-xs text-stone-600 leading-normal">
              Every activity is grounded in empirical research from leading positive psychology scholars.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200/80">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Durable Impact</span>
            </div>
            <p className="text-xs text-stone-600 leading-normal">
              Every completed habit is backed by Firestore cloud persistence so you never lose your progress.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
