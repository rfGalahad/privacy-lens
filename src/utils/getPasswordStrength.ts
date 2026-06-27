type PasswordStrengthLevel = "weak" | "fair" | "strong" | "very-strong";

interface PasswordStrength {
  level: PasswordStrengthLevel;
  score: number;
  label: string;
}

export function getPasswordStrength(password: string): PasswordStrength {
  
  let score = 0;
  if (password.length >= 8)           score++;
  if (password.length >= 12)          score++;
  if (/[A-Z]/.test(password))         score++;
  if (/[0-9]/.test(password))         score++;
  if (/[^A-Za-z0-9]/.test(password))  score++;

  if (score <= 1) return { level: "weak", score, label: "Weak" };
  if (score === 2) return { level: "fair", score, label: "Fair" };
  if (score === 3) return { level: "strong", score, label: "Strong" };

  return { 
    level: "very-strong", 
    score, 
    label: "Very Strong" 
  };
}