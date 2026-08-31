import { getPasswordStrength } from "@/utils/getPasswordStrength";

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

interface Rule {
  label: string;
  test: (password: string) => boolean;
}

interface PasswordStrengthProps {
  password: string;
}

//-----------------------------------------------------------
// CONSTANTS
//-----------------------------------------------------------

const STRENGTH_COLORS = {
  weak: "#e05252",
  fair: "#f0a500",
  strong: "#4ab87e",
  "very-strong": "#F7CF13",
};

const RULES: Rule[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "Uppercase letter",       test: (p) => /[A-Z]/.test(p) },
  { label: "Number",                 test: (p) => /[0-9]/.test(p) },
  { label: "Special character",      test: (p) => /[^A-Za-z0-9]/.test(p) },
];

//-----------------------------------------------------------
// PASSWORD STRENGTH COMPONENT
//-----------------------------------------------------------

export default function PasswordStrength({ 
  password 
}: PasswordStrengthProps ) {
  
  const strength = getPasswordStrength(password);

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2.5">
        <div className="flex gap-1 flex-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 h-0.75 rounded-full bg-surface-2 transition-colors duration-300 ease-in-out"
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
          className="text-[11px] font-semibold tracking-[0.04em] min-w-15 text-right transition-colors duration-300 ease-in-out"
          style={{ color: STRENGTH_COLORS[strength.level] }}
          aria-live="polite"
        >
          {strength.label}
        </span>
      </div>

      <ul className="list-none p-0 m-0 mt-2 flex flex-col gap-1" role="list">
        {RULES.map((rule) => {
          const met = rule.test(password);
          return (
            <li
              key={rule.label}
              className={`flex items-center gap-1.5 text-xs transition-colors duration-300 ease-in-out ${
                met ? "text-accent" : "text-text-muted"
              }`}
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