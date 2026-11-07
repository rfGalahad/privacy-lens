import { ListChecks } from 'lucide-react';

import type { ReviewListProps, ReviewRecommendation } from '../../types/review';

import { PRIORITY_ORDER } from './constants';
import { RECOMMENDATION_FIELDS } from './review/reviewFields';
import { AddItem, ReviewItemShell } from './review/ReviewItemShell';
import { ResultSection } from './ResultSection';
import { RiskLevelBadge } from './RiskLevelBadge';

export const RecommendationList = ({ items, mode, actions }: ReviewListProps<ReviewRecommendation>) => {
  const shown = mode === 'finalized' ? items.filter((i) => i.decision !== 'rejected') : items;
  const sorted = [...shown].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);

  return (
    <ResultSection icon={ListChecks} title={`Recommendations (${shown.length})`}>
      <ul className="flex flex-col gap-4">
        {sorted.map((rec) => (
          <ReviewItemShell key={rec.id} item={rec} mode={mode} fields={RECOMMENDATION_FIELDS} actions={actions}>
            <p className="text-sm font-medium text-text-primary">{rec.action}</p>
            <p className="mt-1 text-xs text-text-secondary">Addresses: {rec.relatedRisk}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <RiskLevelBadge level={rec.priority} prefix="Priority" />
              <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs capitalize text-text-muted">
                Effort: {rec.effort}
              </span>
            </div>
          </ReviewItemShell>
        ))}
      </ul>
      {mode === 'review' && (
        <AddItem label="Add recommendation" fields={RECOMMENDATION_FIELDS} onAdd={actions.add} />
      )}
    </ResultSection>
  );
};