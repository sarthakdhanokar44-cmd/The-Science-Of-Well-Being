import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  getDocs,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase.ts';
import { ActivityProgressRecord, Activity } from '../types.ts';
import { PROGRAM_MODULES } from '../data/programData.ts';

// Helper to look up activity metadata from programData
export function findActivityMetadata(activityId: string): {
  activity: Activity;
  moduleTitle: string;
  week: number;
} | null {
  for (const module of PROGRAM_MODULES) {
    for (const day of module.days) {
      for (const act of day.activities) {
        if (act.id === activityId) {
          return {
            activity: act,
            moduleTitle: module.title,
            week: module.weekNumber,
          };
        }
      }
    }
  }
  return null;
}

// Subscribe to a user's activity progress in real-time
export function subscribeUserProgress(
  userId: string,
  onUpdate: (records: Record<string, ActivityProgressRecord>) => void,
  onError: (error: Error) => void
) {
  const collectionPath = `users/${userId}/activityProgress`;
  const colRef = collection(db, 'users', userId, 'activityProgress');

  return onSnapshot(
    colRef,
    (snapshot) => {
      const records: Record<string, ActivityProgressRecord> = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as ActivityProgressRecord;
        if (data && data.completed !== false) {
          records[docSnap.id] = {
            ...data,
            activityId: docSnap.id,
          };
        }
      });
      onUpdate(records);
    },
    (error) => {
      console.error('Snapshot listener error:', error);
      handleFirestoreError(error, OperationType.GET, collectionPath);
      onError(error);
    }
  );
}

// Mark an activity as complete in Firestore
export async function saveActivityProgress(userId: string, activityId: string): Promise<void> {
  const meta = findActivityMetadata(activityId);
  if (!meta) {
    throw new Error(`Activity ${activityId} not found in program schedule`);
  }

  const { activity, moduleTitle, week } = meta;
  const path = `users/${userId}/activityProgress/${activityId}`;
  const docRef = doc(db, 'users', userId, 'activityProgress', activityId);

  const payload: ActivityProgressRecord = {
    activityId,
    moduleId: `module${activity.moduleId}`,
    moduleTitle,
    week,
    day: activity.dayNumber,
    overallDay: activity.overallDay,
    category: activity.category,
    activityTitle: activity.name,
    completed: true,
    completedAt: new Date().toISOString(),
    userId,
  };

  try {
    await setDoc(docRef, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

// Remove an activity from Firestore or set completed = false
export async function removeActivityProgress(userId: string, activityId: string): Promise<void> {
  const path = `users/${userId}/activityProgress/${activityId}`;
  const docRef = doc(db, 'users', userId, 'activityProgress', activityId);

  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    throw error;
  }
}

// Reset all activity progress for a user
export async function resetAllUserProgress(userId: string): Promise<void> {
  const path = `users/${userId}/activityProgress`;
  const colRef = collection(db, 'users', userId, 'activityProgress');

  try {
    const snapshot = await getDocs(colRef);
    const batch = writeBatch(db);
    snapshot.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    throw error;
  }
}
