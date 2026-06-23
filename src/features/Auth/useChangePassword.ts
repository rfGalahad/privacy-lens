import { useEffect, useRef, useState } from "react";
import { type AuthChangeEvent } from "@supabase/supabase-js";

import { supabase } from "@/shared/lib/supabaseClient";
import { getPasswordStrength } from "@/shared/utils/getPasswordStrength";

import { PASSWORD_RULES } from "./constants";
import type { SubmitStatus, AuthMethod } from "./types";

interface UseChangePasswordOptions {
  onSuccess?: (method: AuthMethod) => void;
  onError?: (error: Error) => void;
}

export function useChangePassword({ onSuccess, onError }: UseChangePasswordOptions = {}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session) => {
        if (event === "INITIAL_SESSION" && !session) {
          setSessionError(true);  // ← no token in URL, direct navigation
          return;
        }
        if (event === "INITIAL_SESSION" || event === "PASSWORD_RECOVERY") {
          setSessionReady(true);
        }
        if (event === "SIGNED_IN") {
          onSuccess?.("google");  // ← called here after OAuth redirect
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [onSuccess]);

  useEffect(() => {
    if (!sessionReady) return;
    const t = setTimeout(() => passwordInputRef.current?.focus(), 400);
    return () => clearTimeout(t);
  }, [sessionReady]);

  const strength       = password ? getPasswordStrength(password) : null;
  const hasMismatch    = confirm.length > 0 && confirm !== password;
  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(password));
  const canSubmit      = allRulesPassed && password === confirm && password.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || !sessionReady) return;

    setIsLoading(true);
    setStatus("loading");

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      onSuccess?.("password");  // ← called here after password update
      setStatus("success");
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Password update failed");
      console.error(error);
      onError?.(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password, 
    setPassword,
    confirm,  
    setConfirm,
    status,   
    isLoading,
    sessionReady,
    sessionError,
    strength, 
    hasMismatch, 
    canSubmit,
    passwordInputRef,
    handleSubmit,
  };
}