import { createContext } from "react";

export type Theme = "dark" | "light";

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
export const THEME_KEY = "app-theme";