import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { ViewType } from '../types.ts';
import {
  Sparkles,
  Menu,
  X,
  RotateCcw,
  CheckCircle2,
  LogOut,
  LogIn,
  ListCheck,
  User as UserIcon,
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  completedActivities: number;
  totalActivities: number;
  onOpenResetModal: () => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  authLoading?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  completedActivities,
  totalActivities,
  onOpenResetModal,
  user,
  onSignIn,
  onSignOut,
  authLoading = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const percent = Math.round((completedActivities / totalActivities) * 100);

  const navItems: { id: ViewType; label: string; weekText: string; icon?: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Overview', weekText: 'Home' },
    { id: 'module-1', label: 'Module 1', weekText: 'Savoring & Gratitude' },
    { id: 'module-2', label: 'Module 2', weekText: 'Kindness & Social' },
    { id: 'module-3', label: 'Module 3', weekText: 'Exercise & Sleep' },
    { id: 'module-4', label: 'Module 4', weekText: 'Meditation & Visit' },
    {
      id: 'completed',
      label: 'Completed',
      weekText: 'All Logged Activities',
      icon: <ListCheck className="w-3.5 h-3.5" />,
    },
  ];

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Title */}
          <button
            type="button"
            id="nav-brand-btn"
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-stone-50 flex items-center justify-center shadow-xs shrink-0">
              <Sparkles className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <span className="block font-serif text-base sm:text-lg font-semibold tracking-tight text-stone-900 leading-tight">
                The Science of Well-Being
              </span>
              <span className="block text-xs font-medium text-stone-600">
                4-Week Daily Action Plan
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Actions: Auth, Progress, Reset */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Progress counter badge */}
            <button
              type="button"
              id="nav-progress-badge"
              onClick={() => handleNavClick('completed')}
              title="View completed activities"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-medium text-stone-700 hover:border-teal-300 hover:bg-teal-50/40 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span className="tabular-nums font-semibold text-stone-900">
                {completedActivities}/{totalActivities}
              </span>
              <span className="text-stone-600">({percent}%)</span>
            </button>

            {/* User Auth Section */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200" id="user-profile-section">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full border border-teal-300 object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-teal-800 text-stone-50 text-xs font-bold flex items-center justify-center">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span
                    className="text-xs font-semibold text-stone-800 max-w-[120px] truncate"
                    title={user.displayName || user.email || ''}
                  >
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </div>

                <button
                  type="button"
                  id="nav-sign-out-btn"
                  onClick={onSignOut}
                  title="Sign out"
                  className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                id="nav-sign-in-btn"
                onClick={onSignIn}
                disabled={authLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 hover:border-stone-400 transition-colors shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5 text-teal-700" />
                <span>Sign in with Google</span>
              </button>
            )}

            {/* Reset button */}
            <button
              type="button"
              id="nav-reset-btn"
              onClick={onOpenResetModal}
              title="Reset All Progress"
              aria-label="Reset Progress"
              className="p-2 rounded-lg text-stone-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="text-xs font-semibold text-stone-700 bg-white px-2.5 py-1 rounded-full border border-stone-200">
              {percent}%
            </div>
            <button
              type="button"
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-5 shadow-lg space-y-2">
          {/* User status in mobile drawer */}
          <div className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center justify-between">
            {user ? (
              <div className="flex items-center gap-2.5">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full border border-teal-300 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-teal-800 text-stone-50 text-xs font-bold flex items-center justify-center">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div className="text-left">
                  <div className="text-xs font-bold text-stone-900 truncate max-w-[180px]">
                    {user.displayName || 'Signed in'}
                  </div>
                  <div className="text-[11px] text-stone-600 truncate max-w-[180px]">
                    {user.email}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-stone-600 text-xs font-medium">
                <UserIcon className="w-4 h-4 text-stone-600" />
                <span>Not signed in</span>
              </div>
            )}

            {user ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignOut();
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 px-2.5 py-1 rounded-lg hover:bg-rose-50 border border-rose-200"
              >
                Sign out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignIn();
                }}
                className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-lg hover:bg-teal-100"
              >
                Sign in with Google
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-stone-900 text-stone-50'
                      : 'text-stone-700 hover:bg-stone-200/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <div>
                      <div className="font-semibold">{item.label}</div>
                      <div
                        className={`text-xs ${isActive ? 'text-stone-300' : 'text-stone-600'}`}
                      >
                        {item.weekText}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 mt-2 border-t border-stone-200 flex items-center justify-between">
            <span className="text-xs text-stone-600">
              {completedActivities} of {totalActivities} completed ({percent}%)
            </span>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResetModal();
              }}
              className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded-md hover:bg-rose-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Plan
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
