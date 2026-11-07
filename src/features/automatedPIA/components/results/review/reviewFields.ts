export type FieldConfig = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
};

const LEVELS = ['low', 'medium', 'high', 'critical'];
const LOW_MEDIUM_HIGH = ['low', 'medium', 'high'];

export const RISK_FIELDS: FieldConfig[] = [
  { key: 'risk', label: 'Risk', type: 'textarea' },
  { key: 'justification', label: 'Justification', type: 'textarea' },
  { key: 'section', label: 'Section', type: 'text' },
  { key: 'likelihood', label: 'Likelihood', type: 'select', options: LOW_MEDIUM_HIGH },
  { key: 'impact', label: 'Impact', type: 'select', options: LOW_MEDIUM_HIGH },
  { key: 'level', label: 'Level', type: 'select', options: LEVELS },
];

export const GAP_FIELDS: FieldConfig[] = [
  { key: 'section', label: 'Section', type: 'text' },
  { key: 'issue', label: 'Issue', type: 'textarea' },
];

export const RECOMMENDATION_FIELDS: FieldConfig[] = [
  { key: 'action', label: 'Action', type: 'textarea' },
  { key: 'relatedRisk', label: 'Addresses risk', type: 'text' },
  { key: 'priority', label: 'Priority', type: 'select', options: LOW_MEDIUM_HIGH },
  { key: 'effort', label: 'Effort', type: 'select', options: LOW_MEDIUM_HIGH },
];