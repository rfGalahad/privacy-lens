import { useState } from "react";

import GoogleButton from "./GoogleButton";
import { validate } from "../utils/loginValidation";

import FormField from "@/shared/components/FormField";
import SubmitButton from "@/shared/components/SubmitButton";
import BrandLogo from "@/shared/components/BrandLogo/BrandLogo";

import "../styles/LoginForm.css";


const EMAIL_MAX = 254; 
const PASSWORD_MAX = 128;
const PASSWORD_MIN = 8;

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(email, password);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= EMAIL_MAX) setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= PASSWORD_MAX) setPassword(e.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);                          
    if (errors.email || errors.password) return;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const isEmailInvalid    = submitted && !!errors.email;
  const isPasswordInvalid = submitted && !!errors.password;

  return (
    <section className="form-panel">
      <div className="form-wrapper">
        {/* Brand */}
        <BrandLogo />

        {/* Title and Subtitle  */}
        <h1 className="title">Welcome back, Guardian!</h1>
        <p className="subtitle">Sign in to continue your journey.</p>

        {/* Google OAuth */}
        <GoogleButton />

        {/* Divider */}
        <div className="divider" role="separator">
          <span>or sign in with email</span>
        </div>

        {/* Form */}
        <form 
          className="form" 
          onSubmit={e => { e.preventDefault(); handleSubmit(); }}
          noValidate
        >
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
              value={email}
              maxLength={EMAIL_MAX}
              onChange={handleEmailChange}
              required
              error={isEmailInvalid ? errors.email : undefined}
            />

            {/* Password Field */}
            <FormField
              id="password"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              maxLength={PASSWORD_MAX}
              onChange={handlePasswordChange}
              required
              error={isPasswordInvalid ? errors.password : undefined}
              hint={
                password.length > 0
                  ? `${password.length} / ${PASSWORD_MAX} characters`
                  : `At least ${PASSWORD_MIN} characters required`
              }
              aside={
                <a href="#forgot" className="forgot-link" tabIndex={0}>
                  Forgot password?
                </a>
              }
            />
          </fieldset>

          <SubmitButton isLoading={isLoading} label="Sign In" />
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