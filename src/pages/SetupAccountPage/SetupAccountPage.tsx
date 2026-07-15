import { LogIn } from "lucide-react";

import ValidationRules from "./components/ValidationRules";
import PasswordStrength from "./components/PasswordStrength";

import assets from "@/assets/assets";
import FormField from "@/components/FormField";
import SubmitButton from "@/components/SubmitButton";
import LinkButton from "@/components/LinkButton";
import GoogleButton from "@/components/GoogleButton/GoogleButton";

import { useForm } from "@/hooks/useForm";
import { useSessionGuard } from "@/hooks/useSessionGuard";
import { supabase } from "@/lib/supabaseClient";
import { useGoogleAuth } from "@/features/auth/hooks/useGoogleAuth";
import { matches, minLength, required } from "@/utils/validators";
import { getPasswordStrength } from "@/utils/getPasswordStrength";

import "./styles/SetupAccountPage.css";

// ─────────────────────────────────────────────
// Sub Component
// ─────────────────────────────────────────────

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <main className="page" style={{ backgroundImage: `url(${assets.pdgBackground})` }}>
    <section className="card">{children}</section>
  </main>
);

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default function SetupAccountPage() {

  const status = useSessionGuard();

  const form = useForm({
    initialValues: { 
      newPassword: "",
      confirmPassword: "" 
    },
    validationRules: {
      newPassword: [required(), minLength(8)],
      confirmPassword: [required(), matches("newPassword")]
    },
    onSubmit: async (values) => {
      const { error } = await supabase.auth.updateUser({ 
        password: values.newPassword 
      });
      if (error) {
        form.setError("newPassword", error.message);
        return;
      }
      // router.push("/dashboard");
    },
  });

  const {
    handleGoogleSignIn,
    isLoading: googleLoading
  } = useGoogleAuth();

  const strength = form.values.newPassword 
    ? getPasswordStrength(form.values.newPassword) 
    : null;
  
  if (status === "pending") {
    return (
      <PageWrapper>
          <p className="subtitle">Verifying your link…</p>
      </PageWrapper>
    );
  } 

  if (status === "invalid"){
    return (
      <PageWrapper>
          <h1 className="heading">Link <em>invalid.</em></h1>
          <p className="subtitle">
            The account setup link you're using is invalid or has expired. Please request a new setup email to create your account.
          </p>
          <LinkButton 
            href="/login" 
            label="Back to login" 
            icon={LogIn}
          />
      </PageWrapper>
    )
  } 

  return (
    <PageWrapper>
        {/* HEADER */}
        <h1 className="heading">
          Create your <em>account</em>
        </h1>
        <p className="subtitle">
          Set up access to continue to your subscription.
        </p>

        {/* GOOGLE LOGIN BUTTON */}
        <GoogleButton 
          label="Continue with Google"
          isLoading={googleLoading} 
          onClick={handleGoogleSignIn}
        />

        <div className="or-divider" role="separator" aria-label="or">
          <span className="or-divider__label">or set a password</span>
        </div>

        {/* CHANGE PASSWORD FORM */}
        <form onSubmit={form.handleSubmit} noValidate>
          <FormField
            id="newPassword"
            label="New Password"
            type="password"
            name="newPassword"
            autoComplete="new-password"
            placeholder="Enter new password"
            value={form.values.newPassword}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.newPassword ? form.errors.newPassword : undefined}
          />

          {strength && (
            <>
              <PasswordStrength password={form.values.newPassword} />
              <ValidationRules password={form.values.newPassword} />
            </>
          )}

          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter new password"
            value={form.values.confirmPassword}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.confirmPassword ? form.errors.confirmPassword : undefined}
          />

          <SubmitButton isLoading={form.isSubmitting} label="Set Password" />
        </form>
    </PageWrapper>
  );
}

