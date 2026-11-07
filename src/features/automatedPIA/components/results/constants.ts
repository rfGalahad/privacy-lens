import type { RiskLevel } from '@/lib/supabase/pia';

export const RISK_LEVEL_ORDER: RiskLevel[] = ['low', 'medium', 'high', 'critical'];

export const RISK_LEVEL_STYLES: Record<RiskLevel, { label: string; badge: string; bar: string }> = {
  low:      { label: 'Low',      badge: 'bg-success-dim text-success', bar: 'bg-success' },
  medium:   { label: 'Medium',   badge: 'bg-warning-dim text-warning', bar: 'bg-warning' },
  high:     { label: 'High',     badge: 'bg-error-dim text-error',     bar: 'bg-error' },
  critical: { label: 'Critical', badge: 'bg-error text-white',         bar: 'bg-error' },
};

export const BREAKDOWN_ROWS = [
  { key: 'base',        label: 'Likelihood × impact', max: 30 },
  { key: 'sensitivity', label: 'Data sensitivity',    max: 25 },
  { key: 'exposure',    label: 'Exposure',            max: 20 },
  { key: 'gaps',        label: 'Control gaps',        max: 25 },
  { key: 'mitigation',  label: 'Mitigation credit',   max: 14 },
] as const;

export const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 } as const;