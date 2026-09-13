import Button from "@/components/ui/Button";
import BrandLogo from "@/components/common/BrandLogo";
import GoogleButton from "@/components/ui/GoogleButton";

import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useLogin } from "../hooks/useLogin";


const LoginForm = () => {
  
  const { 
    handleGoogleSignIn, 
    isLoading: googleLoading 
  } = useGoogleAuth();

  const { form, signInMutation } = useLogin();

  return (
    <section className="flex items-center px-6 py-12 justify-center bg-surface">
      <div className="flex flex-col gap-4 w-full max-w-105 animate-[fadeIn_0.7s_ease_both]">
        {/* Brand */}
        <BrandLogo />

        {/* Title and Subtitle  */}
        <div>
          <h1 className="font-bold text-[clamp(1.8rem,3vw,1rem)] leading-[1.15] text-text-primary mb-(--space-1) mt-(--space-6)">
            Welcome back, Guardian!
          </h1>
          <p className="text-[0.95rem] text-text-secondary mb-(--space-5)">
            Sign in to continue your journey.
          </p>
        </div>

        {/* Google OAuth */}
        <GoogleButton
          label="Continue with Google"
          isLoading={googleLoading}
          onClick={handleGoogleSignIn}
        />

        {/* DIVIDER */}
        <div
          className="flex items-center gap-(--space-2) my-(--space-5) text-[0.78rem] tracking-wider uppercase text-text-muted
                    before:content-[''] before:flex-1 before:h-px before:bg-border
                    after:content-[''] after:flex-1 after:h-px after:bg-border"
          role="separator"
        >
          <span className="relative inline-block bg-surface px-(--space-2) text-[0.78rem] tracking-wider uppercase text-text-muted z-1">
            or sign in with email
          </span>
        </div>

        {/* FORM */}
        <form
          className="flex flex-col gap-(--space-6)"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          noValidate
        >
          <fieldset className="flex flex-col gap-4 border-none">
            <legend className="sr-only">Login credentials</legend>

            <form.AppField name="email">
              {(field) => (
                <field.TextField
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              )}
            </form.AppField>

            <form.AppField name="password">
              {(field) => (
                <field.TextField
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  aside={
                    <a href="#forgot" className="forgot-link" tabIndex={0}>
                      Forgot password?
                    </a>
                  }
                />
              )}
            </form.AppField>
          </fieldset>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                label="Sign In"
                loading={isSubmitting || signInMutation.isPending}
                disabled={!canSubmit}
                className="mt-6"
              />
            )}
          </form.Subscribe>
        </form>

        {/* REGISTER PROMPT */}
        <p className="mt-(--space-4) text-center text-[0.88rem] text-text-muted">
          Don't have an account?{" "}
          <a
            href="/subscribe"
            className="text-accent font-medium no-underline 
                       transition-colors duration-(--transition) 
                       hover:underline 
                       in-data-[theme='light']:text-[#071a35]"
          >
            Create one
          </a>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;