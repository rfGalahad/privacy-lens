import { useReducer } from 'react';

import type { PIAAnalysis } from '@/lib/supabase/pia';

import {
  countItems,
  countPending,
  toReviewDraft,
  type ReviewActions,
  type ReviewItem,
  type ReviewListKey,
  type ReviewedResult,
} from '../types/review';

type AnyItem = ReviewItem<Record<string, string>>;

type Action =
  | { type: 'decide'; list: ReviewListKey; id: string; decision: 'pending' | 'accepted' | 'rejected' }
  | { type: 'edit'; list: ReviewListKey; id: string; changes: Record<string, string> }
  | { type: 'add'; list: ReviewListKey; values: Record<string, string> }
  | { type: 'acceptAllPending' };

const updateList = (
  state: ReviewedResult,
  list: ReviewListKey,
  update: (items: AnyItem[]) => AnyItem[],
): ReviewedResult => ({ ...state, [list]: update(state[list] as AnyItem[]) }) as ReviewedResult;

function reviewReducer(state: ReviewedResult, action: Action): ReviewedResult {
  switch (action.type) {
    case 'decide':
      return updateList(state, action.list, (items) =>
        items.map((item) => (item.id === action.id ? { ...item, decision: action.decision } : item)),
      );

    case 'edit':
      return updateList(state, action.list, (items) =>
        items.map((item) =>
          item.id === action.id ? { ...item, ...action.changes, decision: 'edited' } : item,
        ),
      );

    case 'add':
      return updateList(state, action.list, (items) => [
        ...items,
        { ...action.values, id: crypto.randomUUID(), decision: 'accepted', source: 'analyst' },
      ]);

    case 'acceptAllPending': {
      const acceptPending = (items: AnyItem[]) =>
        items.map((item) => (item.decision === 'pending' ? { ...item, decision: 'accepted' as const } : item));
      return {
        ...state,
        risks: acceptPending(state.risks as AnyItem[]),
        gaps: acceptPending(state.gaps as AnyItem[]),
        recommendations: acceptPending(state.recommendations as AnyItem[]),
      } as ReviewedResult;
    }
  }
}

export const useReviewDraft = (result: PIAAnalysis['result']) => {
  const [review, dispatch] = useReducer(reviewReducer, result, toReviewDraft);

  const actionsFor = (list: ReviewListKey): ReviewActions => ({
    decide: (id, decision) => dispatch({ type: 'decide', list, id, decision }),
    edit: (id, changes) => dispatch({ type: 'edit', list, id, changes }),
    add: (values) => dispatch({ type: 'add', list, values }),
  });

  return {
    review,
    actionsFor,
    acceptAllPending: () => dispatch({ type: 'acceptAllPending' }),
    pendingCount: countPending(review),
    totalCount: countItems(review),
  };
};