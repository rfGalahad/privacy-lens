import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/shared/lib/supabaseClient";

import ImagePanel from "./components/ImagePanel";
import ThemeToggle from "./components/ThemeToggle";
import LoginForm from "./components/LoginForm";

import "./styles/LoginPage.css";


const LoginPage = () => {

  const navigate = useNavigate();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard", { replace: true });
    });
  }, [navigate]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <main className="login-page">
      <ImagePanel />
      <LoginForm />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </main>
  );
};

export default LoginPage;