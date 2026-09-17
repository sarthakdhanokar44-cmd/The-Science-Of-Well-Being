import { useState, useEffect, useMemo, useCallback } from 'react';
import { User } from 'firebase/auth';
import { PROGRAM_MODULES, TOTAL_ACTIVITIES } from '../data/programData.ts';
import { ActivityProgressRecord } from '../types.ts';
import {
  subscribeUserProgress,
  saveActivityProgress,
  removeActivityProgress,
  resetAllUserProgress,
} from '../services/progressService.ts';

export function useProgress(user: User | null) {
  const [progressRecords, setProgressRecords] = useState<Record<string, ActivityProgressRecord>>({});
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  // When user is authenticated, subscribe to Firestore in real-time
  useEffect(() => {
    if (!user) {
      setProgressRecords({});
      setCompletedMap({});
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setSyncError(null);

    const unsubscribe = subscribeUserProgress(
      user.uid,
      (records) => {
        setProgressRecords(records);
        const map: Record<string, boolean> = {};
        Object.keys(records).forEach((id) => {
          if (records[id].completed !== false) {
            map[id] = true;
          }
        });
        setCompletedMap(map);
        setIsLoading(false);
      },
      (error) => {
        console.error('Failed to sync progress with Firestore:', error);
        setSyncError('Failed to load progress from cloud. Please check your connection.');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Toggle activity checkbox
  const toggleActivity = useCallback(
    async (activityId: string) => {
      if (!user) {
        setSyncError('Please sign in with Google to save your progress to the cloud.');
        return;
      }

      const currentlyCompleted = !!completedMap[activityId];
      const willBeCompleted = !currentlyCompleted;

      // Optimistic update
      setCompletedMap((prev) => ({
        ...prev,
        [activityId]: willBeCompleted,
      }));

      try {
        setSyncError(null);
        if (willBeCompleted) {
          await saveActivityProgress(user.uid, activityId);
        } else {
          await removeActivityProgress(user.uid, activityId);
        }
      } catch (err: any) {
        console.error('Error updating activity in Firestore:', err);
        // Revert optimistic update on failure
        setCompletedMap((prev) => ({
          ...prev,
          [activityId]: currentlyCompleted,
        }));
        setSyncError('Failed to save to Firestore. Please try again.');
      }
    },
    [user, completedMap]
  );

  const isCompleted = useCallback(
    (id: string) => {
      return !!completedMap[id];
    },
    [completedMap]
  );

  const resetAllProgress = useCallback(async () => {
    if (!user) return;
    try {
      setSyncError(null);
      await resetAllUserProgress(user.uid);
      setCompletedMap({});
      setProgressRecords({});
    } catch (err) {
      console.error('Error resetting progress in Firestore:', err);
      setSyncError('Failed to reset progress. Please try again.');
    }
  }, [user]);

  // Calculate overall stats
  const overallStats = useMemo(() => {
    let completed = 0;
    Object.keys(completedMap).forEach((id) => {
      if (completedMap[id]) completed++;
    });
    const percent = Math.round((completed / TOTAL_ACTIVITIES) * 100);
    return {
      completed,
      total: TOTAL_ACTIVITIES,
      percent,
      isAllCompleted: completed === TOTAL_ACTIVITIES,
    };
  }, [completedMap]);

  // Calculate stats by module
  const moduleStats = useMemo(() => {
    const stats: Record<number, { completed: number; total: number; percent: number; isDone: boolean }> = {};

    PROGRAM_MODULES.forEach((mod) => {
      let modCompleted = 0;
      let modTotal = 0;
      mod.days.forEach((day) => {
        day.activities.forEach((act) => {
          modTotal++;
          if (completedMap[act.id]) {
            modCompleted++;
          }
        });
      });
      const percent = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
      stats[mod.id] = {
        completed: modCompleted,
        total: modTotal,
        percent,
        isDone: modCompleted === modTotal && modTotal > 0,
      };
    });

    return stats;
  }, [completedMap]);

  // Calculate stats by day for a module
  const getDayStats = useCallback(
    (moduleId: number, dayNumber: number) => {
      const mod = PROGRAM_MODULES.find((m) => m.id === moduleId);
      if (!mod) return { completed: 0, total: 2, percent: 0, isDone: false };
      const day = mod.days.find((d) => d.dayNumber === dayNumber);
      if (!day) return { completed: 0, total: 2, percent: 0, isDone: false };

      let done = 0;
      day.activities.forEach((act) => {
        if (completedMap[act.id]) done++;
      });
      const percent = Math.round((done / day.activities.length) * 100);
      return {
        completed: done,
        total: day.activities.length,
        percent,
        isDone: done === day.activities.length,
      };
    },
    [completedMap]
  );

  return {
    completedMap,
    progressRecords,
    isLoading,
    syncError,
    clearSyncError: () => setSyncError(null),
    toggleActivity,
    isCompleted,
    resetAllProgress,
    overallStats,
    moduleStats,
    getDayStats,
  };
}
