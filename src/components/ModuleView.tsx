import React, { useState } from 'react';
import { ModuleData, ViewType } from '../types.ts';
import { DayCard } from './DayCard.tsx';
import { ProgressBar } from './ProgressBar.tsx';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';

interface ModuleViewProps {
  module: ModuleData;
  completedActivitiesCount: number;
  totalActivitiesCount: number;
  isActivityCompleted: (id: string) => boolean;
  onToggleActivity: (id: string) => void;
  onNavigate: (view: ViewType) => void;
  onOpenResetModal: () => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({
  module,
  completedActivitiesCount,
  totalActivitiesCount,
  isActivityCompleted,
  onToggleActivity,
  onNavigate,
}) => {
  // State for which days are expanded. Default: expand Day 1 (or all if user prefers)
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    // By default, open all days or open the first incomplete day
    module.days.forEach((day) => {
      initial[day.dayNumber] = true; // start with all expanded so user easily sees everything
    });
    return initial;
  });

  const toggleDayExpand = (dayNum: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  const expandAll = () => {
    const next: Record<number, boolean> = {};
    module.days.forEach((d) => (next[d.dayNumber] = true));
    setExpandedDays(next);
  };

  const collapseAll = () => {
    setExpandedDays({});
  };

  const percent =
    totalActivitiesCount > 0
      ? Math.round((completedActivitiesCount / totalActivitiesCount) * 100)
      : 0;
  const isModuleCompleted =
    completedActivitiesCount === totalActivitiesCount && totalActivitiesCount > 0;

  // Previous and next module IDs
  const prevModuleId = module.id > 1 ? module.id - 1 : null;
  const nextModuleId = module.id < 4 ? module.id + 1 : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Top Bar Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          id="module-back-to-dashboard-btn"
          onClick={() => onNavigate('dashboard')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-3.5 py-2 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Previous / Next Module quick jump */}
        <div className="flex items-center gap-2">
          {prevModuleId ? (
            <button
              type="button"
              id="module-prev-btn"
              onClick={() => onNavigate(`module-${prevModuleId}` as ViewType)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 bg-white border border-stone-200 px-3 py-2 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Module {prevModuleId}</span>
            </button>
          ) : null}

          {nextModuleId ? (
            <button
              type="button"
              id="module-next-btn"
              onClick={() => onNavigate(`module-${nextModuleId}` as ViewType)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 bg-white border border-stone-200 px-3 py-2 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs"
            >
              <span>Module {nextModuleId}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Module Hero Header Card */}
      <div
        id="module-header-card"
        className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-stone-50">
            Module {module.id}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700">
            <Calendar className="w-3.5 h-3.5 text-stone-600" />
            Week {module.weekNumber}
          </span>
          <span className="text-xs font-medium text-stone-600">
            7 Days · 14 Activities
          </span>
        </div>

        <div>
          <h1
            id="module-title-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight"
          >
            {module.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
            {module.shortDescription}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 italic">
            {module.scienceSummary}
          </p>
        </div>

        {/* Module Progress Section */}
        <div className="pt-4 border-t border-stone-100 space-y-2">
          <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-stone-700">
            <span id="module-progress-text">
              Module Progress:{' '}
              <strong className="text-stone-900 font-bold tabular-nums">
                {completedActivitiesCount} / {totalActivitiesCount}
              </strong>{' '}
              completed
            </span>
            <span className="font-bold text-stone-900 tabular-nums">{percent}%</span>
          </div>

          <ProgressBar
            id="module-page-progressbar"
            value={percent}
            heightClass="h-2.5"
            colorClass={isModuleCompleted ? 'bg-emerald-600' : 'bg-teal-600'}
          />
        </div>

        {/* Congratulatory message when all 14 activities in the module are done */}
        {isModuleCompleted && (
          <div
            id="module-completed-banner"
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900 text-sm font-semibold"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-base">Module completed! Great work.</p>
              <p className="text-xs text-emerald-800 font-normal">
                You have successfully practiced all 14 habits for Week {module.weekNumber}.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Days Controls Bar */}
      <div className="flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-stone-600" />
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Daily Action Schedule
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            type="button"
            id="expand-all-days-btn"
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          >
            Expand All
          </button>
          <button
            type="button"
            id="collapse-all-days-btn"
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* 7 Days List */}
      <div className="space-y-4">
        {module.days.map((day) => (
          <DayCard
            key={day.dayNumber}
            day={day}
            isExpanded={!!expandedDays[day.dayNumber]}
            onToggleExpand={() => toggleDayExpand(day.dayNumber)}
            isActivityCompleted={isActivityCompleted}
            onToggleActivity={onToggleActivity}
            accentColor={module.accentColor}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          id="bottom-back-dashboard-btn"
          onClick={() => onNavigate('dashboard')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 font-semibold text-xs sm:text-sm hover:bg-stone-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="w-full sm:w-auto flex items-center justify-end gap-3">
          {prevModuleId && (
            <button
              type="button"
              id="bottom-prev-module-btn"
              onClick={() => onNavigate(`module-${prevModuleId}` as ViewType)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 font-semibold text-xs sm:text-sm hover:bg-stone-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Module</span>
            </button>
          )}

          {nextModuleId && (
            <button
              type="button"
              id="bottom-next-module-btn"
              onClick={() => onNavigate(`module-${nextModuleId}` as ViewType)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-800 text-stone-50 font-semibold text-xs sm:text-sm hover:bg-teal-900 transition-colors shadow-xs"
            >
              <span>Next Module</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
