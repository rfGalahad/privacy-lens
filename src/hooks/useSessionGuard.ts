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
    let settled = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "INITIAL_SESSION") {
          settled = true;
          setStatus(session ? "valid" : "invalid");
          return;
        }
        if (event === "SIGNED_IN" || event === "PASSWORD_RECOVERY") {
          settled = true;
          setStatus("valid");
          return;
        }
        if (event === "SIGNED_OUT") {
          settled = true;
          setStatus("invalid");
        }
        // ignore TOKEN_REFRESHED / USER_UPDATED etc — don't clobber status
      }
    );

    // Safety net: if nothing fires within a few seconds, the link was
    // bad/expired and Supabase never produced a session.
    const timeout = setTimeout(() => {
      if (!settled) setStatus("invalid");
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return status;
}