import { useLocation } from "react-router-dom";

const LABELS: Record<string, string> = {
  users: 'Home',
  admin: 'Admin',
  'users-roles': 'Users & Roles',
  dashboard: 'Dashboard',
  pias: 'My PIAs',
  new: 'New PIA',
  'action-items': 'Action Items',
  compliance: 'Compliance',
  'risk-register': 'Risk Register',
  reports: 'Reports',
  vendors: 'Vendor Assessments',
  activity: 'Recent Activity',
  settings: 'Settings',
  config: 'System Configuration',
  tenants: 'Tenant Management',
  integrations: 'Integrations',
  'audit-log': 'Audit Log',
  'system-health': 'System Health',
};

export const useBreadcrumbs = () => {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean); 

  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = LABELS[segment] ?? segment;
    return { label, href };
  });
}