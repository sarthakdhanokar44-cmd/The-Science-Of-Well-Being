import React from 'react';
import { ModuleData } from '../types.ts';
import { ProgressBar } from './ProgressBar.tsx';
import { ArrowRight, CheckCircle2, Sparkles, Calendar } from 'lucide-react';

interface ModuleCardProps {
  module: ModuleData;
  completedCount: number;
  totalCount: number;
  onSelect: (moduleId: number) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  completedCount,
  totalCount,
  onSelect,
}) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isCompleted = completedCount === totalCount && totalCount > 0;
  const isStarted = completedCount > 0;

  // Determine button text
  const buttonLabel = isCompleted
    ? 'Review Module'
    : isStarted
    ? 'Continue'
    : 'Start Module';

  // Accent color mapping for subtle decorative accents
  const getAccentTheme = (color: string) => {
    switch (color) {
      case 'teal':
        return {
          badge: 'bg-teal-50 text-teal-800 border-teal-200',
          progress: 'bg-teal-600',
          accentBorder: 'hover:border-teal-400',
          btn: 'bg-stone-900 text-stone-50 hover:bg-teal-800',
        };
      case 'rose':
        return {
          badge: 'bg-rose-50 text-rose-800 border-rose-200',
          progress: 'bg-rose-600',
          accentBorder: 'hover:border-rose-400',
          btn: 'bg-stone-900 text-stone-50 hover:bg-rose-800',
        };
      case 'amber':
        return {
          badge: 'bg-amber-50 text-amber-800 border-amber-200',
          progress: 'bg-amber-600',
          accentBorder: 'hover:border-amber-400',
          btn: 'bg-stone-900 text-stone-50 hover:bg-amber-800',
        };
      case 'indigo':
      default:
        return {
          badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          progress: 'bg-indigo-600',
          accentBorder: 'hover:border-indigo-400',
          btn: 'bg-stone-900 text-stone-50 hover:bg-indigo-800',
        };
    }
  };

  const theme = getAccentTheme(module.accentColor);

  return (
    <div
      id={`module-card-${module.id}`}
      className={`rounded-2xl border bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md ${
        isCompleted
          ? 'border-emerald-200/90 ring-1 ring-emerald-500/20'
          : `border-stone-200 ${theme.accentBorder}`
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${theme.badge}`}
            >
              Module {module.id}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-600">
              <Calendar className="w-3.5 h-3.5 text-stone-600" />
              Week {module.weekNumber}
            </span>
          </div>

          {isCompleted && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              Completed
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="font-serif text-2xl font-bold text-stone-900 tracking-tight mb-2">
          {module.title}
        </h3>

        <p className="text-sm text-stone-600 leading-relaxed mb-5">
          {module.shortDescription}
        </p>

        {/* Focus areas tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {module.focusAreas.map((focus) => (
            <span
              key={focus}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-stone-100 text-stone-700"
            >
              {focus}
            </span>
          ))}
        </div>
      </div>

      {/* Progress & Actions Footer */}
      <div className="pt-5 border-t border-stone-100 space-y-4">
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="text-stone-600">
              <strong className="text-stone-900 tabular-nums">{completedCount}</strong> of{' '}
              <span className="tabular-nums">{totalCount}</span> completed
            </span>
            <span className="font-semibold text-stone-800 tabular-nums">{percent}%</span>
          </div>
          <ProgressBar value={percent} colorClass={isCompleted ? 'bg-emerald-600' : theme.progress} />
        </div>

        {isCompleted ? (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Module completed! Great work.</span>
          </div>
        ) : null}

        <button
          type="button"
          id={`start-module-btn-${module.id}`}
          onClick={() => onSelect(module.id)}
          className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 shadow-xs ${theme.btn}`}
        >
          <span>{buttonLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
