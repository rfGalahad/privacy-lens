import { useState } from "react";
import { supabase } from "@/shared/lib/supabaseClient";

interface UseGoogleAuthOptions {
  onError?: (error: Error) => void;
}

export function useGoogleAuth({ onError }: UseGoogleAuthOptions) {
  
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/change-password`,
        },
      });
      if (error) throw error;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Google sign-in failed");
      console.error(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGoogleSignIn, isLoading };
}