import React from 'react';
import { DayPlan } from '../types.ts';
import { ActivityItem } from './ActivityItem.tsx';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

interface DayCardProps {
  day: DayPlan;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isActivityCompleted: (id: string) => boolean;
  onToggleActivity: (id: string) => void;
  accentColor?: string;
}

export const DayCard: React.FC<DayCardProps> = ({
  day,
  isExpanded,
  onToggleExpand,
  isActivityCompleted,
  onToggleActivity,
  accentColor = 'teal',
}) => {
  const completedCount = day.activities.filter((act) => isActivityCompleted(act.id)).length;
  const totalCount = day.activities.length;
  const isAllDayDone = completedCount === totalCount && totalCount > 0;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <div
      id={`day-card-${day.dayNumber}`}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isAllDayDone
          ? 'bg-emerald-50/30 border-emerald-200/80 shadow-xs'
          : 'bg-white border-stone-200 shadow-xs hover:border-stone-300'
      }`}
    >
      {/* Day Card Header (Accordion trigger) */}
      <button
        type="button"
        id={`day-header-btn-${day.dayNumber}`}
        onClick={onToggleExpand}
        className="w-full px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-serif font-bold text-sm sm:text-base shrink-0 transition-colors ${
              isAllDayDone
                ? 'bg-emerald-600 text-white'
                : completedCount > 0
                ? 'bg-stone-800 text-white'
                : 'bg-stone-100 text-stone-700'
            }`}
          >
            {isAllDayDone ? <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> : `D${day.dayNumber}`}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-semibold text-stone-900 leading-tight">
                {day.title}
              </h3>
              <span className="text-xs font-medium text-stone-600">
                (Overall Day {day.overallDay})
              </span>
            </div>

            <div className="text-xs font-medium text-stone-600 mt-0.5 flex items-center gap-2">
              <span className="tabular-nums">
                {completedCount} / {totalCount} activities completed
              </span>
              <span>·</span>
              <span className={`font-semibold ${isAllDayDone ? 'text-emerald-700' : 'text-stone-700'}`}>
                {percent}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {isAllDayDone && (
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Completed
            </span>
          )}

          <div
            className={`p-1.5 rounded-lg text-stone-600 hover:text-stone-800 hover:bg-stone-100 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-stone-800' : ''
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-stone-100/90">
          <div className="space-y-3 pt-3">
            {day.activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isCompleted={isActivityCompleted(activity.id)}
                onToggle={onToggleActivity}
                accentColor={accentColor}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
