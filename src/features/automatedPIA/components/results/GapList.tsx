import { SearchX } from 'lucide-react';

import type { ReviewGap, ReviewListProps } from '../../types/review';

import { GAP_FIELDS } from './review/reviewFields';
import { AddItem, ReviewItemShell } from './review/ReviewItemShell';
import { ResultSection } from './ResultSection';

export const GapList = ({ items, mode, actions }: ReviewListProps<ReviewGap>) => {
  const shown = mode === 'finalized' ? items.filter((i) => i.decision !== 'rejected') : items;

  return (
    <ResultSection icon={SearchX} title={`Gaps Found (${shown.length})`}>
      <ul className="flex flex-col gap-3">
        {items.map((gap) => (
          <ReviewItemShell key={gap.id} item={gap} mode={mode} fields={GAP_FIELDS} actions={actions}>
            <p className="text-sm text-text-primary">
              <span className="font-semibold">{gap.section}:</span>{' '}
              <span className="text-text-secondary">{gap.issue}</span>
            </p>
          </ReviewItemShell>
        ))}
      </ul>
      {mode === 'review' && <AddItem label="Add gap" fields={GAP_FIELDS} onAdd={actions.add} />}
    </ResultSection>
  );
};