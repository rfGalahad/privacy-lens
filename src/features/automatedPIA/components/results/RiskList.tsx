import { AlertTriangle } from 'lucide-react';

import type { ReviewListProps, ReviewRisk } from '../../types/review';

import { RISK_LEVEL_ORDER } from './constants';
import { RISK_FIELDS } from './review/reviewFields';
import { AddItem, ReviewItemShell } from './review/ReviewItemShell';
import { ResultSection } from './ResultSection';
import { RiskLevelBadge } from './RiskLevelBadge';

export const RiskList = ({ items, mode, actions }: ReviewListProps<ReviewRisk>) => {
  const shown = mode === 'finalized' ? items.filter((i) => i.decision !== 'rejected') : items;
  const sorted = [...shown].sort(
    (a, b) => RISK_LEVEL_ORDER.indexOf(b.level) - RISK_LEVEL_ORDER.indexOf(a.level),
  );

  return (
    <ResultSection icon={AlertTriangle} title={`Identified Risks (${shown.length})`}>
      <ul className="flex flex-col gap-4">
        {sorted.map((risk) => (
          <ReviewItemShell key={risk.id} item={risk} mode={mode} fields={RISK_FIELDS} actions={actions}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="max-w-prose text-sm font-semibold text-text-primary">{risk.risk}</h3>
              <RiskLevelBadge level={risk.level} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{risk.justification}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-muted">
              <span className="rounded-sm bg-surface px-2 py-1">Section: {risk.section}</span>
              <span className="rounded-sm bg-surface px-2 py-1 capitalize">Likelihood: {risk.likelihood}</span>
              <span className="rounded-sm bg-surface px-2 py-1 capitalize">Impact: {risk.impact}</span>
            </div>
          </ReviewItemShell>
        ))}
      </ul>
      {mode === 'review' && <AddItem label="Add risk" fields={RISK_FIELDS} onAdd={actions.add} />}
    </ResultSection>
  );
};