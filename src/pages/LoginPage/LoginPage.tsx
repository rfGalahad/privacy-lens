import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabaseClient";
import { useTheme } from "@/hooks/useTheme";

import ImagePanel from "./components/ImagePanel";
import ThemeToggle from "./components/ThemeToggle";
import LoginForm from "./components/LoginForm";

import "./styles/LoginPage.css";


const LoginPage = () => {

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard", { replace: true });
    });
  }, [navigate]);

  return (
    <main className="login-page">
      <ImagePanel />
      <LoginForm />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </main>
  );
};

export default LoginPage;