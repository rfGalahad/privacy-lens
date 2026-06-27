import { STRENGTH_COLORS } from "@/features/Auth/auth.constants";
import { getPasswordStrength } from "@/utils/getPasswordStrength";

interface Rule {
  label: string;
  test: (password: string) => boolean;
}

const RULES: Rule[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "Uppercase letter",       test: (p) => /[A-Z]/.test(p) },
  { label: "Number",                 test: (p) => /[0-9]/.test(p) },
  { label: "Special character",      test: (p) => /[^A-Za-z0-9]/.test(p) },
];

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  
  const strength = getPasswordStrength(password);

  return (
    <div className="password-strength">
      <div className="strength-row">
        <div className="strength-bars">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="strength-bar"
              style={{
                background:
                  i < strength.score
                    ? STRENGTH_COLORS[strength.level]
                    : undefined,
              }}
            />
          ))}
        </div>
        <span
          className="strength-label"
          style={{ color: STRENGTH_COLORS[strength.level] }}
          aria-live="polite"
        >
          {strength.label}
        </span>
      </div>

      <ul className="strength-rules" role="list">
        {RULES.map((rule) => {
          const met = rule.test(password);
          return (
            <li
              key={rule.label}
              className={`strength-rule${met ? " strength-rule--met" : ""}`}
            >
              <CheckIcon met={met} />
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const CheckIcon = ({ met }: { met: boolean }) =>
  met ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );