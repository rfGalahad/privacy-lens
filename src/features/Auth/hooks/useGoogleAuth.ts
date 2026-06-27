import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

type AuthStatus = "idle" | "loading" | "success" | "error";

interface UseGoogleAuthOptions {
  redirectTo?: string;             
  onSuccess?: () => void;          
  onError?: (error: Error) => void; 
}

export function useGoogleAuth({
  redirectTo = "/dashboard",
  onSuccess,
  onError,
}: UseGoogleAuthOptions = {}) {

  const [status, setStatus] = useState<AuthStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleSignIn = useCallback(async () => {
    setStatus("loading");
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${redirectTo}`,
          queryParams: {
            access_type: "offline",  
            prompt: "consent",      
          },
        },
      });
      if (error) throw error;
      
      setStatus("success");
      onSuccess?.();
    } catch (err) {
      const error = err instanceof Error
        ? err
        : new Error("Google sign-in failed. Please try again.");

      console.error("[useGoogleAuth]", error);
      setStatus("error");
      setErrorMsg(error.message);
      onError?.(error);
    }
  }, [redirectTo, onSuccess, onError]);

  return {
    handleGoogleSignIn,
    isLoading:  status === "loading",
    isSuccess:  status === "success",
    isError:    status === "error",
    errorMsg,
    status,
  };
}