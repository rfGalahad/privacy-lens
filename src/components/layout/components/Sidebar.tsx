import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  ScrollText,
  Settings,
  Users,
  SlidersHorizontal,
  Plug,
  Activity,
  Rss,
  PlusCircle,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "@/features/auth/types";
import { useAuth } from "@/features/auth";

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

export interface SidebarItem {
  key: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface SidebarProps {
  items?: SidebarItem[];
  role?: UserRole;
  collapsed?: boolean;
}

//-----------------------------------------------------------
// CONSTANTS
//-----------------------------------------------------------

// 5.2 User Dashboard


const USER_ITEMS: SidebarItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/users/dashboard" },
  { key: "quick-start", label: "Quick Start", icon: PlusCircle, path: "/users/pias/new" },
  { key: "my-pias", label: "My PIAs", icon: ClipboardList, path: "/users/pias" },
//  { key: "action-items", label: "Action Items", icon: ListChecks, path: "/users/action-items" },
//  { key: "compliance", label: "Compliance", icon: ShieldCheck, path: "/users/compliance" },
//  { key: "risk-register", label: "Risk Register", icon: AlertTriangle, path: "/users/risk-register" },
//  { key: "reports", label: "Reports", icon: FileBarChart2, path: "/users/reports" },
//  { key: "vendor-assessments", label: "Vendor Assessments", icon: Building2, path: "/users/vendors" },
  { key: "activity-feed", label: "Recent Activity", icon: Rss, path: "/users/activity" },
  { key: "settings", label: "Settings", icon: Settings, path: "/users/settings" },
];

// 5.1 Admin Panel
const ADMIN_ITEMS: SidebarItem[] = [
  { key: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { key: "user-management", label: "Users & Roles", icon: Users, path: "/admin/users-roles" },
  { key: "system-config", label: "System Configuration", icon: SlidersHorizontal, path: "/admin/config" },
  { key: "tenant-management", label: "Tenant Management", icon: Building2, path: "/admin/tenants" },
  { key: "integrations", label: "Integrations", icon: Plug, path: "/admin/integrations" },
  { key: "audit-log", label: "Audit Log", icon: ScrollText, path: "/admin/audit-log" },
  { key: "system-health", label: "System Health", icon: Activity, path: "/admin/system-health" },
  { key: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
];

const ITEMS_BY_ROLE: Record<UserRole, SidebarItem[]> = {
  admin: ADMIN_ITEMS,
  subscriber: USER_ITEMS,
  unknown: [],
  error: [],
};

//-----------------------------------------------------------
// SIDEBAR
//-----------------------------------------------------------

export default function Sidebar({
  items,
  collapsed = false,
}: SidebarProps) {

  const { user } = useAuth();
  const resolvedItems = items ?? ITEMS_BY_ROLE[user?.activeRole ?? "unknown"];

  return (
    <nav
      aria-label="Primary"
      className={`
        h-[calc(100vh-56px)] bg-surface
        border-r border-border
        py-4 px-3
        overflow-y-auto shrink-0
        max-[960px]:w-17 max-[960px]:py-4 max-[960px]:px-2
        ${collapsed ? "w-17" : "w-58"}
      `}
    >
      <ul className="list-none flex flex-col gap-1">
        {resolvedItems.map(({ key, label, icon: Icon, path }) => (
          <li key={key}>
            <NavLink to={path} end>
              {({ isActive }) => (
                <div
                  className={`
                    group flex items-center gap-3 h-10
                    px-3 rounded-md
                    no-underline font-body text-sm font-medium
                    transition
                    max-[960px]:justify-center max-[960px]:px-0
                    ${collapsed ? "justify-center px-0" : ""}
                    ${
                      isActive
                        ? "bg-accent-dim text-accent font-semibold in-data-[theme='light']:text-text-primary"
                        : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.9}
                    className={`
                      shrink-0 transition
                      ${isActive ? "text-accent in-data-[theme='light']:text-text-primary" : "text-text-muted group-hover:text-text-primary"}
                    `}
                  />
                  <span className={`max-[960px]:hidden ${collapsed ? "hidden" : ""}`}>
                    {label}
                  </span>
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}