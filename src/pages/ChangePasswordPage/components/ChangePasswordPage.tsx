import { useState } from "react";
import { LogIn } from "lucide-react";

import SuccessPanel from "./SuccessPanel";
import ValidationRules from "./ValidationRules";

import assets from "@/assets/assets";
import FormField from "@/shared/components/FormField";
import SubmitButton from "@/shared/components/SubmitButton";
import LinkButton from "@/shared/components/LinkButton";
import { useGoogleAuth } from "@/features/Auth/useGoogleAuth";
import { useChangePassword } from "@/features/Auth/useChangePassword";
import { STRENGTH_COLORS } from "@/features/Auth/constants";
import type { AuthMethod } from "@/features/Auth/types";

import "../styles/ChangePasswordPage.css";


export default function ChangePasswordPage() {

  const [authMethod, setAuthMethod] = useState<AuthMethod>("password");

  const { 
    handleGoogleSignIn, 
    isLoading: googleLoading 
  } = useGoogleAuth({
    onError: (err) => console.error(err),
  });

  const {
    password, 
    setPassword,
    confirm,  
    setConfirm,
    status,   
    isLoading: pwLoading,
    sessionReady,
    sessionError,
    strength, 
    hasMismatch, 
    //canSubmit,
    passwordInputRef,
    handleSubmit
  } = useChangePassword({
    onSuccess: (method) => setAuthMethod(method),
    onError: (err) => console.error(err),
  });

  const isLoading = pwLoading || googleLoading;

  if (!sessionReady && !sessionError) {
    return (
      <main 
        className="page" 
        style={{ backgroundImage: `url(${assets.pdgBackground})` }}
      > 
        <section className="card">
          <p className="subtitle">Verifying your link…</p>
        </section>
      </main>
    );
  }

  if (sessionError){
    return (
      <main 
        className="page"
        style={{ backgroundImage: `url(${assets.pdgBackground})` }}
      >
        <section className="card">
          <h1 className="heading">Link <em>invalid.</em></h1>
          <p className="subtitle">
            This page is only accessible from the link sent to your email.
          </p>
          <LinkButton 
            href="/login" 
            label="Back to login" 
            icon={LogIn}
          />
        </section>
      </main>
    )
  } 
  

  return (
    <main
      className="page"
      style={{ backgroundImage: `url(${assets.pdgBackground})` }}
    >
      <section className="card" aria-label="Set up account">
        {status === "success" ? (
          <SuccessPanel method={authMethod} />
        ) : (
          <>
            {/* HEADER */}
            <h1 className="heading">
              Create your <em>account</em>
            </h1>
            <p className="subtitle">
              Set up access to continue to your subscription.
            </p>

            {/* GOOGLE LOGIN BUTTON */}
            <button
              type="button"
              className="google-btn"
              disabled={isLoading}
              onClick={handleGoogleSignIn}
            >
              <GoogleLogo />
              Continue with Google
            </button>

            <div className="or-divider" role="separator" aria-label="or">
              <span className="or-divider__label">or set a password</span>
            </div>

            {/* CHANGE PASSWORD FORM */}
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

              <SubmitButton isLoading={isLoading} label="Set Password" />
            </form>
          </>
        )}
      </section>
    </main>
  );
}

function GoogleLogo() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
} 