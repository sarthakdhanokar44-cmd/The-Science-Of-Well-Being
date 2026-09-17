import React from 'react';
import { Award, CheckCircle2, Sparkles, X } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="completion-dialog-title"
    >
      <div
        id="completion-modal-card"
        className="relative w-full max-w-lg rounded-3xl bg-white p-7 sm:p-9 shadow-2xl border border-stone-200 space-y-6 text-center"
      >
        <button
          type="button"
          id="close-completion-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-600 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close celebration dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Icon */}
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto shadow-xs">
          <Award className="w-8 h-8" />
        </div>

        {/* Title and Message */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>4-Week Program Complete</span>
          </div>

          <h2
            id="completion-dialog-title"
            className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight"
          >
            Congratulations on Completing The Science of Well-Being!
          </h2>

          <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
            You have deliberately engaged in all 56 positive psychology practices across 28 days—savoring,
            gratitude, kindness, social connection, movement, restorative sleep, meditation, and the Gratitude Visit.
          </p>
        </div>

        {/* Key Takeaways */}
        <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 text-left space-y-2 text-xs text-stone-700">
          <div className="flex items-center gap-1.5 font-semibold text-stone-900">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Continuing Your Practice:</span>
          </div>
          <p className="leading-relaxed text-stone-600">
            Well-being is not a static endpoint but an ongoing discipline. Keep revisiting the habits
            that felt most transformative to you and integrate them into your regular routine.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            id="completion-keep-btn"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-800 text-stone-50 text-xs sm:text-sm font-semibold hover:bg-teal-900 transition-colors shadow-xs"
          >
            Keep & Review Progress
          </button>
          <button
            type="button"
            id="completion-restart-btn"
            onClick={() => {
              onClose();
              onReset();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-800 hover:bg-stone-50 text-xs sm:text-sm font-medium transition-colors"
          >
            Restart 4-Week Journey
          </button>
        </div>
      </div>
    </div>
  );
};
