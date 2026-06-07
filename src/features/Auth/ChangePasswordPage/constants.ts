import { type PasswordStrengthLevel } from "./types";

export const PASSWORD_RULES = [
  { 
    label: "At least 8 characters", 
    test: (v: string) => v.length >= 8 
  },
  { 
    label: "One uppercase letter",  
    test: (v: string) => /[A-Z]/.test(v) 
  },
  { 
    label: "One number",            
    test: (v: string) => /[0-9]/.test(v) 
  },
  { 
    label: "One special character", 
    test: (v: string) => /[^A-Za-z0-9]/.test(v) 
  },
];

export const STRENGTH_COLORS: Record<PasswordStrengthLevel, string> = {
  weak:          "#e05252",
  fair:          "#f0a500",
  strong:        "#4ab87e",
  "very-strong": "#F7CF13",
};