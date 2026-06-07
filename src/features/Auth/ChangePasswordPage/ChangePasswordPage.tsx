import { useState, useEffect, useRef } from "react";

import { getPasswordStrength } from "@/shared/utils/getPasswordStrength";
import { assets } from "@/assets/assets";
import FormField from "@/shared/components/FormField";

import ValidationRules from "./components/ValidationRules";
import SuccessPanel from "./components/SuccessPanel";
import { PASSWORD_RULES, STRENGTH_COLORS } from "./constants";
import { type SubmitStatus } from "./types";

import "./styles/ChangePasswordPage.css";
import SubmitButton from "@/shared/components/SubmitButton";


export default function ChangePasswordPage() {

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [isLoading, setIsLoading] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => passwordInputRef.current?.focus(), 400);
    return () => clearTimeout(timer);
  }, []);

  const strength       = password ? getPasswordStrength(password) : null;
  const hasMismatch    = confirm.length > 0 && confirm !== password;
  const allRulesPassed = PASSWORD_RULES.every((rule) => rule.test(password));
  const canSubmit      = allRulesPassed && password === confirm && password.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!canSubmit) return;
    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="page"
      style={{ backgroundImage: `url(${assets.pdgBackground})` }}
    >
      <section className="card" aria-label="Change password">
        {status === "success" ? (
          <SuccessPanel />
        ) : (
          <>
            <h1 className="heading">
              Create your <em>new</em> password
            </h1>
            <p className="subtitle">
              Choose a strong password to keep your account secure.
            </p>

            <div className="divider" role="separator" />

            <form onSubmit={handleSubmit} noValidate>
              <FormField
                id="new-password"
                label="New Password"
                type="password"
                name="new-password"
                autoComplete="new-password"
                placeholder="Enter new password"
                value={password}
                inputRef={passwordInputRef}
                onChange={(e) => setPassword(e.target.value)}
              />

              {strength && (
                <>
                  <div className="strength-row">
                    <div className="strength-bars">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="strength-bar"
                          style={{ background: i < strength.score ? STRENGTH_COLORS[strength.level] : undefined }}
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
                  <ValidationRules password={password} />
                </>
              )}

              <FormField
                id="confirm-password"
                label="Confirm Password"
                type="password"
                name="confirm-password"
                autoComplete="new-password"
                placeholder="Re-enter new password"
                value={confirm}
                error={hasMismatch ? "Passwords do not match" : undefined}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <SubmitButton 
                isLoading={isLoading} 
                label="Set Password" 
              />
            </form>
          </>
        )}
      </section>
    </main>
  );
}