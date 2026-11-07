import { Info, RotateCcw } from 'lucide-react';

import type { PIAAnalysis } from '@/lib/supabase/pia';

import { useReviewDraft } from '../../hooks/useReviewDraft';
import type { FinalizePayload, ResultMode } from '../../types/review';

import { AIAssessmentCard } from './AIAssessmentCard';
import { ComputedScoreCard } from './ComputedScoreCard';
import { GapList } from './GapList';
import { RecommendationList } from './RecommendationList';
import { ReviewFooter } from './review/ReviewFooter';
import { RiskList } from './RiskList';
import type { PIAFormValues } from '../../schema/piaFormSchema';
import type { PIAReportData } from '../pdf/reportTypes';
import { DownloadPdfButton } from '../pdf/DownloadPDFButton';

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type PIAResultViewProps = {
  analysis: PIAAnalysis;
  mode: ResultMode;
  finalized: FinalizePayload | null;
  formValues: PIAFormValues;
  onReset: () => void;
  onStartReview: () => void;
  onFinalize: (payload: FinalizePayload) => void;
};

//-----------------------------------------------------------
// PIA RESULT VIEW
//-----------------------------------------------------------

export const PIAResultView = ({
  analysis,
  mode,
  finalized,
  formValues,
  onReset,
  onStartReview,
  onFinalize
}: PIAResultViewProps) => {

  const { 
    review, 
    actionsFor, 
    acceptAllPending, 
    pendingCount, 
    totalCount 
  } = useReviewDraft(analysis.result);

  const reportData: PIAReportData | null = finalized && {
    projectName: formValues.projectName,
    department: formValues.department,
    dateOfAssessment: formValues.dateOfAssessment,
    responsibleOfficerName: formValues.responsibleOfficerName,
    signOffs: {
      preparedBy: formValues.preparedBy,
      reviewedBy: formValues.reviewedBy,
      approvedBy: formValues.approvedBy,
    },
    computed: { score: analysis.score, level: analysis.level, breakdown: analysis.breakdown },
    aiLevel: analysis.result.suggestedRiskLevel,
    review: finalized.review,           // snapshot taken at finalize time
    finalLevel: finalized.finalLevel,
    levelJustification: finalized.levelJustification,
    finalizedAt: new Date().toLocaleDateString(),
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-text-primary">PIA Results</h1>

        <div className="flex gap-2">
          {mode === 'finalized' && reportData && <DownloadPdfButton data={reportData} />}
          {mode !== 'finalized' && (
            <button type="button" onClick={onReset}
              className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary transition hover:bg-surface-2">
              <RotateCcw className="h-4 w-4" />
              Back to form
            </button>
          )}
          {mode === 'view' && (
            <button type="button" onClick={onStartReview}
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-text-on-light-primary hover:bg-accent-hover">
              Review and Finalize
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-3 rounded-sm border border-border bg-surface p-3 text-sm text-text-secondary">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p>
          {mode === 'finalized'
            ? `Reviewed and finalized. Final risk level: ${finalized?.finalLevel}.`
            : mode === 'review'
              ? 'Review each item: accept it, edit it, or reject it. You can also add your own.'
              : 'This is an AI-generated draft. It does not replace review by your Data Protection Officer or legal counsel.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ComputedScoreCard analysis={analysis} />
        <AIAssessmentCard analysis={analysis} />
      </div>

      <RiskList items={review.risks} mode={mode} actions={actionsFor('risks')} />
      <GapList items={review.gaps} mode={mode} actions={actionsFor('gaps')} />
      <RecommendationList items={review.recommendations} mode={mode} actions={actionsFor('recommendations')} />

      {mode === 'review' && (
        <ReviewFooter
          pendingCount={pendingCount}
          totalCount={totalCount}
          computedLevel={analysis.level}
          aiLevel={analysis.result.suggestedRiskLevel}
          onAcceptAllPending={acceptAllPending}
          onFinalize={(payload) => onFinalize({ review, ...payload })}
        />
      )}
    </div>
  );
};