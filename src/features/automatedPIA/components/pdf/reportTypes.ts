import type { PIAAnalysis, RiskLevel } from '@/lib/supabase/pia';

import type { ReviewedResult } from '../../types/review';

type SignOff = { name: string; signature: string; date: string };

export interface PIAReportData {
  projectName: string;
  department: string;
  dateOfAssessment: string;
  responsibleOfficerName: string;
  signOffs: { preparedBy: SignOff; reviewedBy: SignOff; approvedBy: SignOff };
  computed: Pick<PIAAnalysis, 'score' | 'level' | 'breakdown'>;
  aiLevel: RiskLevel;
  review: ReviewedResult;
  finalLevel: RiskLevel;
  levelJustification: string;
  finalizedAt: string; // formatted date
}