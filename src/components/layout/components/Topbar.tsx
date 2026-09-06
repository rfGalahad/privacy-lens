import { useState, useRef, useEffect } from "react";
import { Bell, Sun, Moon, LogOut, Settings, User, Zap, Loader2, ArrowLeftRight } from "lucide-react";

import type { UserRole } from "@/features/auth/types";
import { getInitials } from "@/utils/string";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/features/auth";

import BrandLogo from "@/components/common/BrandLogo";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";


//-----------------------------------------------------------
// CONSTANTS
//-----------------------------------------------------------

const ROLE_LABEL: Record<UserRole, string> = {
  admin: "Admin",
  subscriber: "Subscriber",
  unknown: "Unknown",
  error: "Error",
};

const ROLE_DOT_COLOR: Record<UserRole, string> = {
  admin: "bg-[#f76f19]",
  subscriber: "bg-[#4f9dff]",
  unknown: "bg-[#8a8a8a]",
  error: "bg-[#f76f6f]",
};

const ROLE_BADGE_COLOR: Record<UserRole, string> = {
  admin: "bg-[#f76f19]/15 text-[#f76f19]",
  subscriber: "bg-[#4f9dff]/15 text-[#4f9dff]",
  unknown: "bg-[#8a8a8a]/15 text-[#8a8a8a]",
  error: "bg-[#f76f6f]/15 text-[#f76f6f]",
};

const OTHER_ROLE: Partial<Record<UserRole, UserRole>> = {
  admin: "subscriber",
  subscriber: "admin",
};

//-----------------------------------------------------------
// TOPBAR
//-----------------------------------------------------------

const Topbar = () => {

  const [notifCount, setNotifCount] = useState(4);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const { user, logout, switchRole } = useAuth();

  const canSwitchRole = (user?.roles.length ?? 0) > 1;
  const nextRole = user ? OTHER_ROLE[user.activeRole] : undefined;

  const handlePiaQuickStart = () => {
    console.log("Quick-start PIA");
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      logout();
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  };

  const handleChangeView = () => {
    if (!nextRole) return;
    setMenuOpen(false);
    switchRole(nextRole);
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
    <header
      className="
        h-14 bg-surface border-b border-border
        flex items-center justify-between
        px-5 gap-4
        animate-[topbar-slide-down_300ms_cubic-bezier(0.4,0,0.2,1)_both]
      "
    >
      <div className="flex items-center min-w-30">
        <BrandLogo />
      </div>

      <div className="flex items-center gap-3 min-w-30 justify-end">
        {/* QUICK PIA BUTTON */}
        {user?.activeRole === "subscriber" && (
          <Button
            label="Quick-start PIA"
            variant="outlined"
            color="accent"
            size="sm"
            prefixIcon={Zap}
            onClick={handlePiaQuickStart}
            className="in-data-[theme=light]:border-border in-data-[theme=light]:hover:bg-surface-2"
          />
        )}

        <IconButton
          icon={theme === "dark" ? Sun : Moon}
          label="Toggle theme"
          onClick={toggleTheme}
        />

        <IconButton
          icon={Bell}
          label="Notifications"
          badge={notifCount}
          onClick={() => setNotifCount(0)}
        />

        {/* USER MENU */}
        <div className="relative" ref={menuRef}>
          <button
            aria-label="User menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              relative w-9 h-9 rounded-full
              bg-transparent border border-border
              flex items-center justify-center
              font-body text-xs font-medium text-text-secondary
              cursor-pointer transition
              hover:bg-accent/25
              in-data-[theme=light]:hover:bg-surface-2
            "
          >
            <span className="pointer-events-none">
              {getInitials(user?.name)}
            </span>
            <span
              className={`
                absolute -bottom-px -right-px w-2.5 h-2.5
                rounded-full border-[1.5px] border-surface
                ${ROLE_DOT_COLOR[user?.activeRole ?? "unknown"]}
              `}
            />
          </button>

          {menuOpen && (
            <div
              className="
                absolute top-[calc(100%+8px)] right-0
                min-w-60 bg-surface border border-border
                rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.24)]
                p-2 z-50
              "
            >
              <div className="flex flex-col gap-0.5 px-3 py-2">
                <span className="font-body text-[13px] font-semibold text-text-primary">
                  {user?.name ?? "User"}
                </span>
                <span className="font-body text-xs text-text-muted">
                  {user?.email ?? "sample@email.com"}
                </span>
                <span
                  className={`
                    self-start mt-1 px-1.75 py-px rounded-full
                    text-[10px] font-bold uppercase tracking-[0.02em]
                    ${ROLE_BADGE_COLOR[user?.activeRole ?? "unknown"]}
                  `}
                >
                  {ROLE_LABEL[user?.activeRole ?? "unknown"]}
                </span>
              </div>

              <div className="h-px bg-border my-2" />

              <button
                className="
                  flex items-center gap-2 w-full px-3 py-2
                  bg-transparent border-none rounded-sm
                  font-body text-[13px] text-text-secondary
                  cursor-pointer transition
                  hover:bg-surface-2 hover:text-text-primary
                "
              >
                <User size={15} />
                Profile
              </button>
              <button
                className="
                  flex items-center gap-2 w-full px-3 py-2
                  bg-transparent border-none rounded-sm
                  font-body text-[13px] text-text-secondary
                  cursor-pointer transition
                  hover:bg-surface-2 hover:text-text-primary
                "
              >
                <Settings size={15} />
                Settings
              </button>

              {/* CHANGE VIEW — only shown when the user actually holds more than one role */}
              {canSwitchRole && nextRole && (
                <button
                  onClick={handleChangeView}
                  className="
                    flex items-center gap-2 w-full px-3 py-2
                    bg-transparent border-none rounded-sm
                    font-body text-[13px] text-text-secondary
                    cursor-pointer transition
                    hover:bg-surface-2 hover:text-text-primary
                  "
                >
                  <ArrowLeftRight size={15} />
                  Switch to {ROLE_LABEL[nextRole]} view
                </button>
              )}

              <div className="h-px bg-border my-2" />

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="
                  flex items-center gap-2 w-full px-3 py-2
                  bg-transparent border-none rounded-sm
                  font-body text-[13px] text-text-secondary
                  cursor-pointer transition
                  hover:bg-surface-2 hover:text-text-primary
                  hover:not-disabled:text-[#f76f6f]
                  disabled:opacity-70 disabled:cursor-not-allowed
                "
              >
                {loggingOut ? (
                  <Loader2 size={15} className="animate-spin" />
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