import { useState, useRef, useEffect } from "react";
import { Bell, Sun, Moon, LogOut, Settings, User } from "lucide-react";
import BrandLogo from "@/shared/components/BrandLogo/BrandLogo";
import "../styles/Topbar.css";

const Topbar = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hasNotif, setHasNotif] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next === "light" ? "light" : "");
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

      <div className="topbar-center" />

      <div className="topbar-right">
        <button
          className="topbar-btn"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          className="topbar-btn"
          aria-label="Notifications"
          onClick={() => setHasNotif(false)}
        >
          <Bell size={18} />
          {hasNotif && <span className="notif-dot" />}
        </button>

        <div className="topbar-user" ref={menuRef}>
          <button
            className="topbar-avatar"
            aria-label="User menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            JD
          </button>

          {menuOpen && (
            <div className="user-menu">
              <div className="user-menu-header">
                <span className="user-menu-name">John Doe</span>
                <span className="user-menu-email">john@example.com</span>
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

              <button className="user-menu-item user-menu-item-danger">
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;