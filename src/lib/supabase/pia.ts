import { supabase } from '@/lib/supabase/client';
import type { PIAFormValues } from '@/features/automatedPIA';
import type { ReviewedResult } from '@/features/automatedPIA/types/review';

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
type Lmh = 'low' | 'medium' | 'high';

export interface PIAAnalysis {
  score: number;
  level: RiskLevel;
  breakdown: {
    base: number;
    sensitivity: number;
    exposure: number;
    gaps: number;
    mitigation: number;
  };
  result: {
    suggestedRiskLevel: RiskLevel;
    summary: string;
    risks: {
      risk: string;
      likelihood: Lmh;
      impact: Lmh;
      level: RiskLevel;
      justification: string;
      section: string;
    }[];
    gaps: { section: string; issue: string }[];
    recommendations: {
      priority: Lmh;
      action: string;
      relatedRisk: string;
      effort: Lmh;
    }[];
  };
}

//-----------------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------------

export async function requestAnalysis(values: PIAFormValues): Promise<PIAAnalysis> {
  const { data, error } = await supabase.functions.invoke<PIAAnalysis>('analyze-pia', {
    body: { values },
  });
  if (error) throw error;
  if (!data) throw new Error('empty_response');
  return data;
}

export async function startReview(
  assessmentId: string, 
  piaId: string, 
  result: ReviewedResult
) {
  const { data, error } = await supabase
    .from('pia_reviews')
    .upsert({ 
      assessment_id: assessmentId, 
      pia_id: piaId, 
      reviewed_result: result 
    }, { 
        onConflict: 'assessment_id', 
        ignoreDuplicates: true 
      }
    )
    .select().single();
  if (error) throw error;
  return data;
}

export async function saveReview(id: string, patch: {
  reviewed_result: ReviewedResult; 
  final_level?: RiskLevel;
  level_justification?: string; 
  analyst_notes?: string;
}) {
  const { error } = await supabase.from('pia_reviews').update(patch).eq('id', id);
  if (error) throw error;
}

export async function finalizeReview(id: string) {
  const { error } = await supabase.from('pia_reviews').update({ status: 'finalized' }).eq('id', id);
  if (error) throw error;
}