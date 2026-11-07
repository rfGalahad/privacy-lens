import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Dispatch } from "react";
import type { Session } from "@supabase/supabase-js";

import {
  onAuthStateChange,
  mapSupabaseUser,
  resolveUserRoles,
  ROLE_ROUTES,
  resolveActiveRole,
} from "@/lib/supabase/auth";

import type { AuthAction } from "../types";


export function useAuthSession(dispatch: Dispatch<AuthAction>) {
  
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;

    async function handleSession(session: Session | null) {
      if (!session) {
        userIdRef.current = null;
        dispatch({ type: "AUTH_LOGOUT" });
        return;
      }

      try {
        // New user signing in: show the loading screen, not the login page.
        // Same user (token refresh, tab refocus): update silently, no flash.
        if (userIdRef.current !== session.user.id) {
          dispatch({ type: "AUTH_INIT" });
        }

        const resolved = await resolveUserRoles(session.user.id);
        if (cancelled) return;

        const activeRole = resolveActiveRole(resolved.roles);
        const user = mapSupabaseUser(session.user, resolved, activeRole);

        userIdRef.current = session.user.id;
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user, token: session.access_token },
        });
      } catch (err) {
        if (cancelled) return;
        console.error("useAuthSession: failed to resolve session:", err);
        userIdRef.current = null;
        dispatch({ type: "AUTH_LOGOUT" });
        navigateRef.current(ROLE_ROUTES.error);
      }
    }

    // supabase-js v2 fires INITIAL_SESSION on subscribe, so a separate
    // getSession() call is redundant and causes a duplicate resolve.
    const { data: { subscription } } = onAuthStateChange((_event, session) => {
      // Don't await Supabase calls directly inside this callback; it can
      // deadlock the client. Defer to the next tick.
      setTimeout(() => {
        if (!cancelled) void handleSession(session);
      }, 0);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [dispatch]);
}