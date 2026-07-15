import { useState, useRef, useEffect } from "react";
import { Bell, Sun, Moon, LogOut, Settings, User, Zap, Loader2 } from "lucide-react";
import BrandLogo from "@/components/BrandLogo/BrandLogo";
import "../styles/Topbar.css";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/features/auth";

type Role = "admin" | "editor" | "viewer";

const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

const Topbar = () => {

  const [notifCount, setNotifCount] = useState(4);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const role: Role = "admin";

  const handlePiaQuickStart = () => {
    // wire up to your PIA creation flow
    console.log("Quick-start PIA");
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      // if your app redirects on logout (e.g. via router or auth listener),
      // this component may unmount before we get here — that's fine.
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false); // only reset on failure, so button doesn't flicker back on success
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <BrandLogo />
      </div>

      <div className="topbar-right">
        {/* QUICK PIA BUTTON */}
        <button
          className="topbar-pia-btn"
          onClick={handlePiaQuickStart}
          aria-label="Quick-start PIA"
        >
          <Zap size={15} />
          <span>Quick-start PIA</span>
        </button>

        {/* THEME BUTTON */}
        <button
          className="topbar-btn"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* NOTIFICATION BUTTON */}
        <button
          className="topbar-btn"
          aria-label="Notifications"
          onClick={() => setNotifCount(0)}
        >
          <Bell size={18} />
          {notifCount > 0 && (
            <span className="notif-badge">
              {notifCount > 99 ? "99+" : notifCount}
            </span>
          )}
        </button>

        {/* USER MENU */}
        <div className="topbar-user" ref={menuRef}>
          <button
            className="topbar-avatar"
            aria-label="User menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="topbar-avatar-initials">JD</span>
            <span className={`topbar-role-dot topbar-role-dot--${role}`} />
          </button>

          {menuOpen && (
            <div className="user-menu">
              <div className="user-menu-header">
                <span className="user-menu-name">user</span>
                <span className="user-menu-email">john@example.com</span>
                <span className={`user-menu-role user-menu-role--${role}`}>
                  {ROLE_LABEL[role]}
                </span>
              </div>

              <div className="user-menu-divider" />

              <button className="user-menu-item">
                <User size={15} />
                Profile
              </button>
              <button className="user-menu-item">
                <Settings size={15} />
                Settings
              </button>

              <div className="user-menu-divider" />

              <button
                className="user-menu-item user-menu-item-danger"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? (
                  <Loader2 size={15} className="user-menu-item-spinner" />
                ) : (
                  <LogOut size={15} />
                )}
                {loggingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;