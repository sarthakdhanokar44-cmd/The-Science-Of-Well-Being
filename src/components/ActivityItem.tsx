import React from 'react';
import { Activity } from '../types.ts';
import { Check, Clock } from 'lucide-react';

interface ActivityItemProps {
  activity: Activity;
  isCompleted: boolean;
  onToggle: (id: string) => void;
  accentColor?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  isCompleted,
  onToggle,
}) => {
  // Category styling helper
  const getCategoryBadgeClass = (category: string) => {
    switch (category.toLowerCase()) {
      case 'savoring':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'gratitude':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'kindness':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'social connection':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'exercise':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'sleep hygiene':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'meditation':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'gratitude visit':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div
      id={`activity-card-${activity.id}`}
      onClick={() => onToggle(activity.id)}
      className={`group relative rounded-xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer select-none ${
        isCompleted
          ? 'bg-stone-100/60 border-stone-200 shadow-none'
          : 'bg-white border-stone-200/90 hover:border-teal-500/40 hover:shadow-xs'
      }`}
      role="checkbox"
      aria-checked={isCompleted}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onToggle(activity.id);
        }
      }}
    >
      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Custom Checkbox */}
        <div className="pt-0.5 shrink-0">
          <button
            type="button"
            id={`checkbox-${activity.id}`}
            aria-label={`Mark ${activity.name} as ${isCompleted ? 'incomplete' : 'completed'}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(activity.id);
            }}
            className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all duration-200 ${
              isCompleted
                ? 'bg-teal-700 border-teal-700 text-white shadow-xs'
                : 'bg-stone-50 border-stone-300 group-hover:border-teal-500 text-transparent'
            }`}
          >
            <Check className={`w-4 h-4 stroke-[2.5] transition-transform duration-150 ${isCompleted ? 'scale-100' : 'scale-50'}`} />
          </button>
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border uppercase ${getCategoryBadgeClass(
                activity.category
              )}`}
            >
              {activity.category}
            </span>

            {activity.estimatedMinutes && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600">
                <Clock className="w-3 h-3 text-stone-600" />
                {activity.estimatedMinutes} min
              </span>
            )}

            {isCompleted && (
              <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                Completed
              </span>
            )}
          </div>

          <h4
            className={`text-base font-semibold transition-colors duration-150 ${
              isCompleted ? 'text-stone-600 line-through decoration-stone-400' : 'text-stone-900'
            }`}
          >
            {activity.name}
          </h4>

          <p
            className={`text-sm leading-relaxed mt-1 transition-colors duration-150 ${
              isCompleted ? 'text-stone-600' : 'text-stone-700'
            }`}
          >
            {activity.instructions}
          </p>
        </div>
      </div>
    </div>
  );
};
