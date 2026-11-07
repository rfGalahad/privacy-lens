import { useState } from 'react';

import type { RiskLevel } from '@/lib/supabase/pia';

import type { FinalizePayload } from '../../../types/review';
import { RISK_LEVEL_ORDER } from '../constants';

type ReviewFooterProps = {
  pendingCount: number;
  totalCount: number;
  computedLevel: RiskLevel;
  aiLevel: RiskLevel;
  onAcceptAllPending: () => void;
  onFinalize: (payload: Pick<FinalizePayload, 'finalLevel' | 'levelJustification'>) => void;
};

export const ReviewFooter = ({
  pendingCount, totalCount, computedLevel, aiLevel, onAcceptAllPending, onFinalize,
}: ReviewFooterProps) => {
  const [finalLevel, setFinalLevel] = useState<RiskLevel | ''>('');
  const [justification, setJustification] = useState('');

  const differsFromBoth = finalLevel !== '' && finalLevel !== computedLevel && finalLevel !== aiLevel;
  const canFinalize =
    pendingCount === 0 && finalLevel !== '' && (!differsFromBoth || justification.trim().length > 0);

  const handleAcceptAll = () => {
    if (window.confirm(`Accept all ${pendingCount} remaining items without changes?`)) onAcceptAllPending();
  };

  return (
    <div className="sticky bottom-0 z-10 flex flex-col gap-3 rounded-md border border-border bg-surface-3 p-4 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text-primary">
          {totalCount - pendingCount} of {totalCount} items reviewed
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {pendingCount > 0 && (
            <button type="button" onClick={handleAcceptAll} className="text-sm text-accent hover:underline">
              Accept all remaining
            </button>
          )}

          <label className="flex items-center gap-2 text-sm text-text-secondary">
            Final risk level
            <select
              value={finalLevel}
              onChange={(e) => setFinalLevel(e.target.value as RiskLevel | '')}
              className="rounded-sm border border-input-border bg-input-bg px-2 py-1 text-sm capitalize text-text-primary"
            >
              <option value="">Select…</option>
              {RISK_LEVEL_ORDER.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>

          <button
            type="button"
            disabled={!canFinalize}
            onClick={() => finalLevel && onFinalize({ finalLevel, levelJustification: justification.trim() })}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-text-on-light-primary hover:bg-accent-hover disabled:opacity-40"
          >
            Finalize
          </button>
        </div>
      </div>

      {differsFromBoth && (
        <textarea
          rows={2}
          maxLength={1000}
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          placeholder={`Your level (${finalLevel}) differs from the computed (${computedLevel}) and AI (${aiLevel}) levels. Explain why.`}
          className="w-full rounded-sm border border-input-border bg-input-bg px-3 py-2 text-sm text-text-primary"
        />
      )}
    </div>
  );
};