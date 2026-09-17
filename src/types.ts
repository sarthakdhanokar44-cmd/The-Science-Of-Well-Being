export interface Activity {
  id: string; // e.g. 'm1-d1-a1'
  moduleId: number; // 1 | 2 | 3 | 4
  dayNumber: number; // 1..7 (within module)
  overallDay: number; // 1..28
  category: string; // e.g. "Savoring", "Gratitude", "Kindness", "Social Connection", etc.
  name: string; // e.g. "Mindful Drink"
  instructions: string; // Exact full instruction from PDF
  estimatedMinutes?: number;
}

export interface DayPlan {
  dayNumber: number; // 1..7
  overallDay: number; // 1..28
  title: string;
  activities: Activity[];
}

export interface ModuleData {
  id: number; // 1 | 2 | 3 | 4
  weekNumber: number; // 1..4
  title: string;
  subtitle: string;
  shortDescription: string;
  focusAreas: [string, string];
  scienceSummary: string;
  accentColor: string; // Tailwind color token
  days: DayPlan[];
}

export type ViewType = 'dashboard' | 'module-1' | 'module-2' | 'module-3' | 'module-4' | 'completed';

export interface ActivityProgressRecord {
  activityId: string;
  moduleId: string;
  moduleTitle: string;
  week: number;
  day: number;
  overallDay: number;
  category: string;
  activityTitle: string;
  completed: boolean;
  completedAt?: string | null;
  userId: string;
}
