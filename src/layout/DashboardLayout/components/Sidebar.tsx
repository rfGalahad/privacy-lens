import { useState } from "react";
import "../styles/Sidebar.css";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "ti-layout-dashboard" },
  { label: "Settings", href: "/settings", icon: "ti-settings" },
];

const Sidebar = () => {
  const [active, setActive] = useState("/dashboard");

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`nav-item ${active === item.href ? "nav-item-active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActive(item.href);
            }}
          >
            <i className={`ti ${item.icon} nav-icon`} aria-hidden="true" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;