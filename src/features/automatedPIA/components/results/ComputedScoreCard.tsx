import { Gauge } from 'lucide-react';

import type { PIAAnalysis } from '@/lib/supabase/pia';

import { BREAKDOWN_ROWS, RISK_LEVEL_STYLES } from './constants';
import { ResultSection } from './ResultSection';
import { RiskLevelBadge } from './RiskLevelBadge';

export const ComputedScoreCard = ({ analysis }: { analysis: PIAAnalysis }) => {
  const { score, level, breakdown } = analysis;

  return (
    <ResultSection icon={Gauge} title="Computed Risk Score" aside={<RiskLevelBadge level={level} />}>
      <p className="mb-4 text-xs text-text-muted">
        Calculated from your form answers using fixed rules. The same answers always give the same score.
      </p>

      <div className="flex items-baseline gap-2">
        <span className="font-display text-5xl font-bold text-text-primary">{score}</span>
        <span className="text-sm text-text-secondary">/ 100</span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className={`h-full rounded-full ${RISK_LEVEL_STYLES[level].bar}`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {BREAKDOWN_ROWS.map(({ key, label, max }) => {
          const value = breakdown[key];
          const isCredit = key === 'mitigation';
          const width = Math.min(100, (Math.abs(value) / max) * 100);
          return (
            <li key={key} className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{label}</span>
                <span className="font-medium text-text-primary">
                  {value > 0 ? `+${value}` : value} <span className="text-text-muted">/ {isCredit ? `−${max}` : max}</span>
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className={`h-full rounded-full ${isCredit ? 'bg-success' : 'bg-accent'}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </ResultSection>
  );
};