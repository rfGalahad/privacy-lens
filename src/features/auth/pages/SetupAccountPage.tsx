import { LogIn } from "lucide-react";

import PDGBackground from "@/assets/pdg-background.png";
import Button from "@/components/ui/Button";
import GoogleButton from "@/components/ui/GoogleButton";

import ValidationRules from "../components/ValidationRules";
import PasswordStrength from "../components/PasswordStrength";

import { useSessionGuard } from "@/hooks/useSessionGuard";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useSetupAccount } from "../hooks/useSetupAccount";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------------------
// SUB COMPONENTS
//-----------------------------------------------------------

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <main
    className="w-full min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-body text-text-primary"
    style={{ backgroundImage: `${PDGBackground}` }}
  >
    <section
      className="relative z-1 bg-surface border border-border rounded-2xl w-full max-w-110 pt-12 px-10 pb-10
                 shadow-[0_0_0_1px_rgba(247,207,19,0.04),0_24px_64px_rgba(0,0,0,0.5),0_0_80px_rgba(247,207,19,0.04)]
                 animate-fadeUp"
    >
      {children}
    </section>
  </main>
);
 
//-----------------------------------------------------------
// SETUP ACCOUNT PAGE
//-----------------------------------------------------------

export const SetupAccountPage = () => {

  const navigate = useNavigate();
  const status = useSessionGuard();
  const { handleGoogleSignIn, isLoading: googleLoading } = useGoogleAuth();
  const { form, updatePasswordMutation } = useSetupAccount();

  if (status === "pending") {
    return (
      <PageWrapper>
        <p className="text-sm text-text-secondary leading-normal mb-8">Verifying your link…</p>
      </PageWrapper>
    );
  }

  if (status === "invalid") {
    return (
      <PageWrapper>
        <h1 className="font-display text-[28px] font-bold text-text-primary leading-tight mb-2">
          Link <em className="italic font-normal text-accent">invalid.</em>
        </h1>
        <p className="text-sm text-text-secondary leading-normal mb-8">
          The account setup link you're using is invalid or has expired. Please request a new setup email to create your account.
        </p>
        <Button
          label="Back to login"
          color="accent"
          onClick={() => navigate('/login')}
          suffixIcon={LogIn}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* HEADER */}
      <h1 className="text-[28px] font-bold text-text-primary leading-tight mb-2">
        Create your <em className="text-accent">account</em>
      </h1>
      <p className="text-sm text-text-secondary leading-normal mb-8">
        Set up access to continue to your subscription.
      </p>

      {/* GOOGLE LOGIN BUTTON */}
      <GoogleButton
        label="Continue with Google"
        isLoading={googleLoading}
        onClick={handleGoogleSignIn}
      />

      <div
        className="flex items-center gap-2.5 mb-5
                   before:content-[''] before:flex-1 before:h-px before:bg-[linear-gradient(90deg,transparent,var(--color-border),transparent)]
                   after:content-[''] after:flex-1 after:h-px after:bg-[linear-gradient(90deg,transparent,var(--color-border),transparent)]"
        role="separator"
        aria-label="or"
      >
        <span className="text-xs text-text-tertiary whitespace-nowrap">or set a password</span>
      </div>

      {/* CHANGE PASSWORD FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        noValidate

      >
        <div className="flex flex-col gap-(--space-4) mb-(--space-5)">
          <form.AppField name="newPassword">
            {(field) => (
              <>
                <field.TextField
                  label="New Password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  required
                />
                {field.state.value && (
                  <>
                    <PasswordStrength password={field.state.value} />
                    <ValidationRules password={field.state.value} />
                  </>
                )}
              </>
            )}
          </form.AppField>

          <form.AppField name="confirmPassword">
            {(field) => (
              <field.TextField
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                placeholder="Re-enter new password"
                required
              />
            )}
          </form.AppField>

          {updatePasswordMutation.isError && (
            <p
              className="text-[0.78rem] text-(--color-error,#e53e3e) mb-3"
              role="alert"
            >
              {updatePasswordMutation.error instanceof Error
                ? updatePasswordMutation.error.message
                : "Something went wrong"}
            </p>
          )}
        </div>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              label="Set Password"
              color="accent"
              loading={isSubmitting || updatePasswordMutation.isPending}
              disabled={!canSubmit}
              fullWidth
            />
          )}
        </form.Subscribe>
      </form>
    </PageWrapper>
  );
};

export default SetupAccountPage;