import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

import ImagePanel from "../components/ImagePanel";
import ThemeToggle from "../components/ThemeToggle";
import LoginForm from "../components/LoginForm";


export const LoginPage = () => {

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user) return;
    navigate(user.roles.includes("admin") ? "/admin/dashboard" : "/users/dashboard", {
      replace: true,
    });
  }, [isLoading, isAuthenticated, user, navigate]);

  return (
    <main className="grid grid-cols-2 min-h-screen max-[900px]:grid-cols-1">
      <ImagePanel />
      <LoginForm />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </main>
  );
};

export default LoginPage; 