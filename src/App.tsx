import { useState, useEffect, useRef } from 'react';
import { PROGRAM_MODULES } from './data/programData.ts';
import { ViewType, ModuleData } from './types.ts';
import { useAuth } from './context/AuthContext.tsx';
import { useProgress } from './hooks/useProgress.ts';
import { Navbar } from './components/Navbar.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { ModuleView } from './components/ModuleView.tsx';
import { CompletedActivitiesView } from './components/CompletedActivitiesView.tsx';
import { CompletionModal } from './components/CompletionModal.tsx';
import { ResetConfirmModal } from './components/ResetConfirmModal.tsx';
import { SignInPromptModal } from './components/SignInPromptModal.tsx';
import { Sparkles, AlertCircle, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const {
    user,
    loading: authLoading,
    signInWithGoogle,
    logout,
    authError,
    clearAuthError,
  } = useAuth();

  const {
    completedMap,
    progressRecords,
    isLoading: progressLoading,
    syncError,
    clearSyncError,
    toggleActivity,
    isCompleted,
    resetAllProgress,
    overallStats,
    moduleStats,
  } = useProgress(user);

  // When unauthenticated user clicks an activity checkbox, show the sign in prompt
  const handleToggleActivity = (activityId: string) => {
    if (!user) {
      setShowSignInPrompt(true);
      return;
    }
    toggleActivity(activityId);
  };

  // Track previous completion state so we only auto-show the celebration modal once when reaching 56/56
  const prevCompletedRef = useRef<number>(overallStats.completed);

  useEffect(() => {
    if (
      overallStats.isAllCompleted &&
      prevCompletedRef.current < overallStats.total &&
      overallStats.completed === overallStats.total
    ) {
      setShowCompletionModal(true);
    }
    prevCompletedRef.current = overallStats.completed;
  }, [overallStats.isAllCompleted, overallStats.completed, overallStats.total]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Determine active module if in module view
  const activeModuleId = currentView.startsWith('module-')
    ? parseInt(currentView.replace('module-', ''), 10)
    : null;

  const activeModule: ModuleData | undefined = activeModuleId
    ? PROGRAM_MODULES.find((m) => m.id === activeModuleId)
    : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      {/* Toast / Notification Banner for Sync or Auth issues */}
      {(syncError || authError) && (
        <div className="sticky top-0 z-50 bg-amber-500 text-stone-900 px-4 py-2.5 text-xs font-semibold shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <AlertCircle className="w-4 h-4 text-stone-950 shrink-0" />
            <span>{syncError || authError}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              clearSyncError();
              clearAuthError();
            }}
            className="p-1 hover:bg-amber-600/30 rounded-md transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        completedActivities={overallStats.completed}
        totalActivities={overallStats.total}
        onOpenResetModal={() => setShowResetModal(true)}
        user={user}
        onSignIn={signInWithGoogle}
        onSignOut={logout}
        authLoading={authLoading}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {authLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-teal-800 border-t-transparent animate-spin"></div>
            <p className="text-xs font-medium text-stone-600">Connecting to well-being database...</p>
          </div>
        ) : currentView === 'completed' ? (
          <CompletedActivitiesView
            progressRecords={progressRecords}
            onNavigate={setCurrentView}
            onToggleActivity={handleToggleActivity}
          />
        ) : currentView === 'dashboard' || !activeModule ? (
          <DashboardView
            modules={PROGRAM_MODULES}
            moduleStats={moduleStats}
            overallStats={overallStats}
            onNavigate={setCurrentView}
            onOpenResetModal={() => setShowResetModal(true)}
            user={user}
            onSignIn={signInWithGoogle}
          />
        ) : (
          <ModuleView
            module={activeModule}
            completedActivitiesCount={moduleStats[activeModule.id]?.completed ?? 0}
            totalActivitiesCount={moduleStats[activeModule.id]?.total ?? 14}
            isActivityCompleted={isCompleted}
            onToggleActivity={handleToggleActivity}
            onNavigate={setCurrentView}
            onOpenResetModal={() => setShowResetModal(true)}
          />
        )}
      </main>

      {/* Minimalistic & Professional Wellness Footer */}
      <footer className="mt-16 border-t border-stone-200/80 bg-stone-100/60 py-8 text-stone-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-700" />
            <span className="font-semibold text-stone-700">
              The Science of Well-Being — 4 Week Daily Action Plan
            </span>
          </div>

          <div className="flex items-center gap-1 text-stone-600 text-center">
            <span>28 Days · 56 Evidence-Based Rewirements</span>
            <span className="mx-1.5 hidden sm:inline">·</span>
            <span className="hidden sm:inline">Secured by Firebase Cloud Firestore</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onReset={resetAllProgress}
      />

      <ResetConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={resetAllProgress}
        completedCount={overallStats.completed}
      />

      <SignInPromptModal
        isOpen={showSignInPrompt}
        onClose={() => setShowSignInPrompt(false)}
        onSignIn={signInWithGoogle}
      />
    </div>
  );
}
