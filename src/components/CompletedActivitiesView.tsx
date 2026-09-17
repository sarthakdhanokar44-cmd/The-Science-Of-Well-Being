import React, { useState, useMemo } from 'react';
import { ActivityProgressRecord, ViewType } from '../types.ts';
import { PROGRAM_MODULES } from '../data/programData.ts';
import {
  CheckCircle2,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowUpDown,
  Sparkles,
  Inbox,
} from 'lucide-react';

interface CompletedActivitiesViewProps {
  progressRecords: Record<string, ActivityProgressRecord>;
  onNavigate: (view: ViewType) => void;
  onToggleActivity: (activityId: string) => void;
}

type SortMode = 'structure' | 'recentFirst' | 'oldestFirst';

export const CompletedActivitiesView: React.FC<CompletedActivitiesViewProps> = ({
  progressRecords,
  onNavigate,
  onToggleActivity,
}) => {
  const [sortMode, setSortMode] = useState<SortMode>('structure');

  const allRecords = useMemo(() => {
    return (Object.values(progressRecords) as ActivityProgressRecord[]).filter((r) => r.completed !== false);
  }, [progressRecords]);

  // Grouped structure: Module -> Day -> Activities
  const groupedStructure = useMemo(() => {
    return PROGRAM_MODULES.map((module) => {
      const daysWithCompleted = module.days
        .map((day) => {
          const completedActivities = day.activities
            .map((act) => {
              const record = progressRecords[act.id];
              return record && record.completed !== false ? { act, record } : null;
            })
            .filter((item): item is NonNullable<typeof item> => item !== null);

          return {
            dayNumber: day.dayNumber,
            overallDay: day.overallDay,
            title: day.title,
            completedActivities,
          };
        })
        .filter((d) => d.completedActivities.length > 0);

      const totalCompletedInModule = daysWithCompleted.reduce(
        (sum, d) => sum + d.completedActivities.length,
        0
      );

      return {
        moduleId: module.id,
        moduleTitle: module.title,
        weekNumber: module.weekNumber,
        accentColor: module.accentColor,
        totalCompleted: totalCompletedInModule,
        days: daysWithCompleted,
      };
    }).filter((m) => m.totalCompleted > 0);
  }, [progressRecords]);

  // Chronological / Flat list
  const sortedFlatList = useMemo(() => {
    const list = [...allRecords];
    if (sortMode === 'recentFirst') {
      list.sort((a, b) => {
        const timeA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
        const timeB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
        return timeB - timeA;
      });
    } else if (sortMode === 'oldestFirst') {
      list.sort((a, b) => {
        const timeA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
        const timeB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
        return timeA - timeB;
      });
    }
    return list;
  }, [allRecords, sortMode]);

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return 'Completed';
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);
    } catch {
      return isoString;
    }
  };

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          id="completed-back-to-dashboard-btn"
          onClick={() => onNavigate('dashboard')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-3.5 py-2 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {allRecords.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-medium text-stone-600 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              View:
            </span>
            <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs font-semibold">
              <button
                type="button"
                id="sort-mode-structure-btn"
                onClick={() => setSortMode('structure')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  sortMode === 'structure'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                By Module & Day
              </button>
              <button
                type="button"
                id="sort-mode-recent-btn"
                onClick={() => setSortMode('recentFirst')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  sortMode === 'recentFirst'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Recent First
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Header Banner */}
      <div
        id="completed-activities-header"
        className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Completed Activities
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              All rewirements you have completed and synchronized with Cloud Firestore
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-semibold text-stone-800">
            Total Accomplished:{' '}
            <strong className="font-serif text-lg text-teal-800 tabular-nums">
              {allRecords.length}
            </strong>{' '}
            / 56
          </span>
          <span className="text-stone-600 font-medium">
            {Math.round((allRecords.length / 56) * 100)}% of the full 4-week program
          </span>
        </div>
      </div>

      {/* Empty State */}
      {allRecords.length === 0 ? (
        <div
          id="no-completed-activities-card"
          className="rounded-3xl border border-dashed border-stone-300 bg-white/70 p-12 text-center space-y-4 shadow-2xs"
        >
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Inbox className="w-8 h-8 stroke-1" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-stone-800">
              No activities completed yet.
            </h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto">
              Start your journey today by checking off activities in Module 1. Your accomplishments
              will appear here in real time.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('module-1')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-800 text-stone-50 text-xs sm:text-sm font-semibold hover:bg-teal-900 transition-colors shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>Go to Module 1</span>
          </button>
        </div>
      ) : sortMode === 'structure' ? (
        /* Hierarchical view: Module -> Day -> Activity */
        <div className="space-y-8" id="completed-grouped-container">
          {groupedStructure.map((mod) => (
            <div
              key={mod.moduleId}
              className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-7 shadow-xs space-y-6"
            >
              {/* Module Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-900 text-stone-50">
                      Module {mod.moduleId}
                    </span>
                    <span className="text-xs font-medium text-stone-600">
                      Week {mod.weekNumber}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-stone-900 mt-1">
                    {mod.moduleTitle}
                  </h2>
                </div>

                <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {mod.totalCompleted} completed
                </div>
              </div>

              {/* Days List */}
              <div className="space-y-5">
                {mod.days.map((d) => (
                  <div key={d.dayNumber} className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 pl-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-600" />
                      <span>
                        Day {d.dayNumber} · (Overall Day {d.overallDay})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {d.completedActivities.map(({ act, record }) => (
                        <div
                          key={act.id}
                          className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${getCategoryBadgeClass(
                                    act.category
                                  )}`}
                                >
                                  {act.category}
                                </span>
                                <h4 className="text-sm font-semibold text-stone-900 truncate">
                                  {act.name}
                                </h4>
                              </div>
                              <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                                {act.instructions}
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            <div className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600">
                              <Clock className="w-3 h-3" />
                              <span>{formatDate(record.completedAt)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Flat chronological list */
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-7 shadow-xs space-y-3" id="completed-flat-container">
          {sortedFlatList.map((record) => (
            <div
              key={record.activityId}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-stone-200/80 bg-stone-50/70 hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">
                      {record.moduleTitle}
                    </span>
                    <span className="text-xs text-stone-600">· Day {record.day}</span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${getCategoryBadgeClass(
                        record.category
                      )}`}
                    >
                      {record.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-stone-900 mt-1">
                    {record.activityTitle}
                  </h4>
                </div>
              </div>

              <div className="shrink-0 pl-9 sm:pl-0 sm:text-right">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-600">
                  <Clock className="w-3.5 h-3.5 text-stone-600" />
                  {formatDate(record.completedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
