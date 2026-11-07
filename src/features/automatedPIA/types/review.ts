import type { PIAAnalysis, RiskLevel } from '@/lib/supabase/pia';

export type ResultMode = 'view' | 'review' | 'finalized';
export type ReviewDecision = 'pending' | 'accepted' | 'edited' | 'rejected';
export type ReviewListKey = 'risks' | 'gaps' | 'recommendations';

export type ReviewItem<T> = T & {
  id: string;
  decision: ReviewDecision;
  source: 'ai' | 'analyst'; // analyst = added manually
};

type AIResult = PIAAnalysis['result'];
export type ReviewRisk = ReviewItem<AIResult['risks'][number]>;
export type ReviewGap = ReviewItem<AIResult['gaps'][number]>;
export type ReviewRecommendation = ReviewItem<AIResult['recommendations'][number]>;

export interface ReviewedResult {
  summary: string;
  risks: ReviewRisk[];
  gaps: ReviewGap[];
  recommendations: ReviewRecommendation[];
}

export interface FinalizePayload {
  review: ReviewedResult;
  finalLevel: RiskLevel;
  levelJustification: string;
}

/** Actions already bound to one list (risks, gaps or recommendations). */
export interface ReviewActions {
  decide: (id: string, decision: 'pending' | 'accepted' | 'rejected') => void;
  edit: (id: string, changes: Record<string, string>) => void;
  add: (values: Record<string, string>) => void;
}

export type ReviewListProps<T> = {
  items: ReviewItem<T>[];
  mode: ResultMode;
  actions: ReviewActions;
};

/** Copies the AI output into a draft where every item is pending. */
export const toReviewDraft = (result: AIResult): ReviewedResult => {
  const wrap = <T extends object>(items: T[]) =>
    items.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
      decision: 'pending' as const,
      source: 'ai' as const,
    }));

  return {
    summary: result.summary,
    risks: wrap(result.risks),
    gaps: wrap(result.gaps),
    recommendations: wrap(result.recommendations),
  };
};

const allItems = (review: ReviewedResult) => [
  ...review.risks,
  ...review.gaps,
  ...review.recommendations,
];

export const countPending = (review: ReviewedResult) =>
  allItems(review).filter((item) => item.decision === 'pending').length;

export const countItems = (review: ReviewedResult) => allItems(review).length;