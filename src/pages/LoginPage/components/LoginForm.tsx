import FormField from "@/components/FormField";
import SubmitButton from "@/components/SubmitButton";
import BrandLogo from "@/components/BrandLogo";
import GoogleButton from "@/components/GoogleButton";

import { useForm } from "@/hooks/useForm";
import { email, required } from "@/utils/validators";
import { supabase } from "@/lib/supabaseClient";
import { useGoogleAuth } from "@/features/auth/hooks/useGoogleAuth";
import { useToast } from "@/components/Toast";

import "../styles/LoginForm.css";


const LoginForm = () => {

  const toast = useToast();

  const {
    handleGoogleSignIn,
    isLoading: googleLoading
  } = useGoogleAuth();

  const form = useForm({
    initialValues: { 
      email: "",
      password: "" 
    },
    validationRules: {
      email: [required(), email()],
      password: [required()],
    },
    onSubmit: async (values) => {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
      console.error(error.message);
      toast.error("Failed to sign in. Check your email and password.", {
        title: "Login Error"
      });
      return;
    }

    toast.success("Signed in successfully!");
    },
  });

  return (
    <section className="form-panel">
      <div className="form-wrapper">
        {/* Brand */}
        <BrandLogo />

        {/* Title and Subtitle  */}
        <h1 className="title">Welcome back, Guardian!</h1>
        <p className="subtitle">Sign in to continue your journey.</p>

        {/* Google OAuth */}
        <GoogleButton
          label="Continue with Google"
          isLoading={googleLoading} 
          onClick={handleGoogleSignIn}
        />

        {/* Divider */}
        <div className="divider" role="separator">
          <span>or sign in with email</span>
        </div>

        {/* Form */}
        <form className="form" onSubmit={form.handleSubmit} noValidate>
          <fieldset className="fieldset">
            <legend className="visually-hidden">Login credentials</legend>
            {/* Email Field */}
            <FormField
              id="email"
              label="Email address"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.values.email}
              onChange={form.handleChange}
              required
              error={form.touched.email ? form.errors.email : undefined}
            />

            {/* Password Field */}
            <FormField
              id="password"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.values.password}
              onChange={form.handleChange}
              error={form.touched.password ? form.errors.password : undefined}
              required
              aside={
                <a href="#forgot" className="forgot-link" tabIndex={0}>
                  Forgot password?
                </a>
              }
            />
          </fieldset>

          <SubmitButton 
            isLoading={form.isSubmitting} 
            label="Sign In"
          />
        </form>

        {/* Register Prompt */}
        <p className="register-prompt">
          Don't have an account?{" "}
          <a href="#register" className="register-link">Create one</a>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;