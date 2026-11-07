import type { PIAAnalysis } from '@/lib/supabase/pia';

export const mockAnalysis: PIAAnalysis = {
  score: 43,
  level: 'medium',
  breakdown: { base: 20, sensitivity: 15, exposure: 17, gaps: 0, mitigation: -9 },
  result: {
    suggestedRiskLevel: 'high',
    summary:
      'The PIA review reveals significant privacy risks in processing sensitive health information and minors data for online booking and lab results delivery. Although technical controls like encryption at rest and HTTPS are present, critical gaps exist including third-party data sharing without formal Data Sharing Agreements, absent parental consent mechanisms for minors, and lack of documented incident response protocols.',
    risks: [
      {
        risk: 'Third-party data sharing without an executed Data Sharing Agreement with lab partners.',
        likelihood: 'high',
        impact: 'high',
        level: 'high',
        justification:
          'Sharing sensitive health data with third-party lab partners without a formal agreement may not align with the principles of proportionality and accountability.',
        section: 'Data Sharing',
      },
      {
        risk: 'Inadequate safeguards and consent mechanisms for processing health data of minors.',
        likelihood: 'medium',
        impact: 'high',
        level: 'high',
        justification:
          'Parental consent procedures are not documented for minor patients, which could conflict with transparency requirements.',
        section: 'Data Sensitivity and Minors',
      },
      {
        risk: 'Ten-year retention period for general appointment data without proportionality justification.',
        likelihood: 'medium',
        impact: 'medium',
        level: 'medium',
        justification:
          'Routine booking data retained alongside health records may exceed its necessary operational life.',
        section: 'Retention and Disposal',
      },
      {
        risk: 'No multi-factor authentication for cloud-stored health information.',
        likelihood: 'medium',
        impact: 'high',
        level: 'high',
        justification:
          'Relying on role-based access and encryption alone leaves records exposed to credential compromise.',
        section: 'Technical Security',
      },
      {
        risk: 'Incident response and breach notification procedures are not documented.',
        likelihood: 'medium',
        impact: 'high',
        level: 'high',
        justification:
          'Only privacy training is listed as an organizational safeguard, so breach handling readiness is unclear.',
        section: 'Organizational Safeguards',
      },
    ],
    gaps: [
      { section: 'Data Sharing', issue: 'Data is shared with lab partners without an executed Data Sharing Agreement.' },
      { section: 'Minors Data', issue: 'No parental consent mechanism or age verification is documented.' },
      { section: 'Organizational Safeguards', issue: 'No documented incident management workflow or periodic re-assessment.' },
      { section: 'Retention and Disposal', issue: 'No criteria separating routine logs from clinical record retention.' },
    ],
    recommendations: [
      {
        priority: 'high',
        action: 'Execute Data Sharing Agreements with security and confidentiality obligations for all lab partners.',
        relatedRisk: 'Third-party data sharing without an executed Data Sharing Agreement with lab partners.',
        effort: 'medium',
      },
      {
        priority: 'high',
        action: 'Implement parental or guardian consent verification for minors’ health records.',
        relatedRisk: 'Inadequate safeguards and consent mechanisms for processing health data of minors.',
        effort: 'medium',
      },
      {
        priority: 'high',
        action: 'Enforce multi-factor authentication, access logging, and regular privilege audits on cloud storage.',
        relatedRisk: 'No multi-factor authentication for cloud-stored health information.',
        effort: 'medium',
      },
      {
        priority: 'medium',
        action: 'Review retention schedules so appointment data is disposed of when no longer needed.',
        relatedRisk: 'Ten-year retention period for general appointment data without proportionality justification.',
        effort: 'low',
      },
    ],
  },
};