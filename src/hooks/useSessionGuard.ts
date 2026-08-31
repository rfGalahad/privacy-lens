import { useEffect, useState } from "react";
import { isEmailLinkEvent, onAuthStateChange } from "@/lib/supabase/auth";


//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type SessionStatus = "pending" | "valid" | "invalid";

//-----------------------------------------------------------
// SESSION GUARD HOOK
//-----------------------------------------------------------

export function useSessionGuard() {

  const [status, setStatus] = useState<SessionStatus>("pending");

  useEffect(() => {
    let settled = false;

    const { data: { subscription } } = onAuthStateChange((event) => {
    if (isEmailLinkEvent(event)) {
      settled = true;
      setStatus("valid");
      return;
    }
    if (event === "INITIAL_SESSION" || event === "SIGNED_OUT") {
      settled = true;
      setStatus("invalid");
      return;
    }
    // ignore TOKEN_REFRESHED / USER_UPDATED etc — don't clobber status
  });

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