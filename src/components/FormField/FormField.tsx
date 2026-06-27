import { useState } from "react";

import './FormField.css';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  aside?: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

const FormField = ({ 
  id, 
  label, 
  error, 
  hint, 
  aside, 
  type, 
  ...inputProps 
}: FormFieldProps) => {

  const [showPassword, setShowPassword] = useState(false);

  const isPassword   = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;
  const hasError     = !!error;

  return (
    <div className={`field${hasError ? " field--error" : ""}`}>

      <div className="label-row">
        <label className="label" htmlFor={id}>{label}</label>
        {aside}
      </div>

      <div className={isPassword ? "input-wrapper" : undefined}>
        <input
          id={id}
          className="input"
          type={resolvedType}
          aria-invalid={hasError}
          aria-describedby={error ? `${id}-feedback` : hint ? `${id}-feedback` : undefined}
          {...inputProps}
        />

        {isPassword && (
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {(error || hint) && (
        <span
          id={`${id}-feedback`}
          className={error ? "field-error" : "field-hint"}
          role={error ? "alert" : undefined}
        >
          {error ?? hint}
        </span>
      )}

    </div>
  );
};

export default FormField;