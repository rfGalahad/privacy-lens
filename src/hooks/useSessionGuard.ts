import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type SessionStatus = "pending" | "valid" | "invalid";

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────
export function useSessionGuard() {
  const [status, setStatus] = useState<SessionStatus>("pending");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "INITIAL_SESSION") {
          setStatus(session ? "pending" : "invalid");
          return;
        }
        if (event === "PASSWORD_RECOVERY") {
          setStatus("valid");
        }
        setStatus("invalid");
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  return status;
}