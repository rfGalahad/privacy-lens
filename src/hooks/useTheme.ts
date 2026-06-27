import { useState, useEffect } from "react";

type Theme = "dark" | "light";

const THEME_KEY = "app-theme";

export function useTheme(defaultTheme: Theme = "dark") {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(THEME_KEY) as Theme) ?? defaultTheme;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const isDark = theme === "dark";

  return { theme, setTheme, toggleTheme, isDark };
}