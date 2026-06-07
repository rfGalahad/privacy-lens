import { PASSWORD_RULES } from "../constants";
import '../styles/ValidationRules.css';

const CheckIcon = () => {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ValidationRules = ({ password }: { password: string }) => {
  return (
    <ul className="rule-list" aria-label="Password requirements">
      {PASSWORD_RULES.map((rule) => {
        const passed = rule.test(password);
        return (
          <li key={rule.label} className={`rule ${passed ? "rule--passed" : ""}`}>
            <span className="rule__icon" aria-hidden="true">
              {passed && <CheckIcon />}
            </span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}

export default ValidationRules;