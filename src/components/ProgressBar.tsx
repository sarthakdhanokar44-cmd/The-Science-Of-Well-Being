import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  colorClass?: string;
  heightClass?: string;
  showLabel?: boolean;
  labelPosition?: 'right' | 'top';
  id?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  colorClass = 'bg-teal-600',
  heightClass = 'h-2.5',
  showLabel = false,
  labelPosition = 'right',
  id,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  if (showLabel && labelPosition === 'top') {
    return (
      <div className="w-full" id={id}>
        <div className="flex justify-between items-center text-xs font-medium text-stone-600 mb-1.5">
          <span>Progress</span>
          <span className="tabular-nums">{clampedValue}%</span>
        </div>
        <div className={`w-full bg-stone-100 rounded-full overflow-hidden ${heightClass} ring-1 ring-stone-200/50`}>
          <div
            className={`${heightClass} ${colorClass} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 w-full" id={id}>
      <div className={`flex-1 bg-stone-100 rounded-full overflow-hidden ${heightClass} ring-1 ring-stone-200/50`}>
        <div
          className={`${heightClass} ${colorClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-stone-600 tabular-nums min-w-[3ch] text-right">
          {clampedValue}%
        </span>
      )}
    </div>
  );
};
