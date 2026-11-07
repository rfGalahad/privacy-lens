import type { RiskLevel } from '@/lib/supabase/pia';

import { RISK_LEVEL_STYLES } from './constants';

export const RiskLevelBadge = ({ level, prefix }: { level: RiskLevel; prefix?: string }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${RISK_LEVEL_STYLES[level].badge}`}
  >
    {prefix && <span className="mr-1 opacity-70">{prefix}</span>}
    {RISK_LEVEL_STYLES[level].label}
  </span>
);