import { Check } from "lucide-react";

//-----------------------------------------------------------
// CONSTANTS
//-----------------------------------------------------------

const PASSWORD_RULES = [
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

//-----------------------------------------------------------
// VALIDATION RULES COMPONENT
//-----------------------------------------------------------

const ValidationRules = ({ password }: { password: string }) => {
  return (
    <ul className="grid grid-cols-2 gap-1.5 mb-4 list-none p-0" aria-label="Password requirements">
      {PASSWORD_RULES.map((rule) => {
        const passed = rule.test(password);
        return (
          <li
            key={rule.label}
            className={`flex items-center gap-1.5 text-xs transition-colors duration-(--transition) ${
              passed ? "text-[#4ab87e]" : "text-text-muted"
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center shrink-0 transition-colors duration-(--transition) ${
                passed ? "bg-[#4ab87e] border-[#4ab87e]" : ""
              }`}
              aria-hidden="true"
            >
              {passed && <Check size={8} strokeWidth={2.5} color="white" />}
            </span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}

export default ValidationRules;