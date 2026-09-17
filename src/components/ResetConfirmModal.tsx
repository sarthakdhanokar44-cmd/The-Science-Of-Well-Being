import React from 'react';
import { RotateCcw, AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  completedCount: number;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  completedCount,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
    >
      <div
        id="reset-confirm-dialog"
        className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-7 shadow-xl border border-stone-200 space-y-5"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-600 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Cancel reset"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div>
            <h3 id="reset-modal-title" className="font-serif text-lg font-bold text-stone-900">
              Reset All Progress?
            </h3>
            <p className="text-sm text-stone-600 mt-1 leading-relaxed">
              This will uncheck all{' '}
              <strong className="text-stone-900 font-semibold">{completedCount}</strong> completed
              activities across the entire 4-week program. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            id="confirm-reset-btn"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Everything</span>
          </button>
        </div>
      </div>
    </div>
  );
};
