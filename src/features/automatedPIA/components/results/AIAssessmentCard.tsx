import { Sparkles, Info } from 'lucide-react';

import type { PIAAnalysis } from '@/lib/supabase/pia';

import { RISK_LEVEL_ORDER } from './constants';
import { ResultSection } from './ResultSection';
import { RiskLevelBadge } from './RiskLevelBadge';

export const AIAssessmentCard = ({ analysis }: { analysis: PIAAnalysis }) => {
  const { level: computedLevel, result } = analysis;
  const aiLevel = result.suggestedRiskLevel;
  const differs = aiLevel !== computedLevel;
  const aiIsHigher = RISK_LEVEL_ORDER.indexOf(aiLevel) > RISK_LEVEL_ORDER.indexOf(computedLevel);

  return (
    <ResultSection icon={Sparkles} title="AI Assessment" aside={<RiskLevelBadge level={aiLevel} />}>
      <p className="text-sm leading-relaxed text-text-primary">{result.summary}</p>

      {differs && (
        <div className="mt-4 flex gap-3 rounded-sm border border-warning/40 bg-warning-dim p-3 text-sm text-text-primary">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <p>
            The AI rated this <strong>{aiLevel}</strong>, while the computed score is <strong>{computedLevel}</strong>.
            {aiIsHigher
              ? " The AI found risks that the form's answers alone don't capture, such as weak or missing controls. Review the findings below."
              : ' The AI found fewer concerns than the rules-based score suggests. Review both before deciding.'}
          </p>
        </div>
      )}
    </ResultSection>
  );
};