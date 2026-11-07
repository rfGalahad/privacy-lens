import { Navigate, useLocation } from "react-router-dom";

import { useTheme } from "@/hooks/useTheme";
import LoadingPage from "@/components/feedback/LoadingPage";
import { useAuth } from "../hooks/useAuth";

import ImagePanel from "../components/ImagePanel";
import ThemeToggle from "../components/ThemeToggle";
import LoginForm from "../components/LoginForm";

export const LoginPage = () => {
  
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <LoadingPage />;

  if (isAuthenticated && user) {
    const from = (location.state as { from?: Location } | null)?.from?.pathname;
    const home = user.roles.includes("admin") ? "/admin/dashboard" : "/users/dashboard";
    return <Navigate to={from ?? home} replace />;
  }

  return (
    <main className="grid grid-cols-2 min-h-screen max-[900px]:grid-cols-1">
      <ImagePanel />
      <LoginForm />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </main>
  );
};

export default LoginPage;