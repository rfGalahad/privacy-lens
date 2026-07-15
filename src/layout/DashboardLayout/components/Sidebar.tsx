import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  ShieldCheck,
  AlertTriangle,
  FileBarChart2,
  Building2,
  ScrollText,
  Settings,
  type LucideIcon,
} from "lucide-react";
import "../styles/Sidebar.css";

export interface SidebarItem {
  key: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

const DEFAULT_ITEMS: SidebarItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { key: "my-pias", label: "My PIAs", icon: ClipboardList, path: "/pias" },
  { key: "compliance", label: "Compliance", icon: ShieldCheck, path: "/compliance" },
  { key: "risk-register", label: "Risk Register", icon: AlertTriangle, path: "/risk-register" },
  { key: "reports", label: "Reports", icon: FileBarChart2, path: "/reports" },
  { key: "vendor-assessments", label: "Vendor Assessments", icon: Building2, path: "/vendors" },
  { key: "audit-log", label: "Audit Log", icon: ScrollText, path: "/audit-log" },
  { key: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export interface SidebarProps {
  items?: SidebarItem[];
}

export default function Sidebar({ items = DEFAULT_ITEMS }: SidebarProps) {
  return (
    <nav className="sidebar" aria-label="Primary">
      <ul>
        {items.map(({ key, label, icon: Icon, path }) => (
          <li key={key}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `sidebar__item${isActive ? " is-active" : ""}`
              }
            >
              <Icon size={18} strokeWidth={1.9} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}