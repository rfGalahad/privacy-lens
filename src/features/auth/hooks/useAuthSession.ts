import { useEffect } from "react";
import type { Dispatch } from "react";
import type { Session } from "@supabase/supabase-js";

import {
  getSession,
  onAuthStateChange,
  mapSupabaseUser,
  resolveUserRoles,
  ROLE_ROUTES,
  resolveActiveRole,
} from "@/lib/supabase/auth";

import type { AuthAction } from "../types";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------------------
// AUTH SESSION HOOK
//-----------------------------------------------------------

export function useAuthSession(dispatch: Dispatch<AuthAction>) {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function handleSession(session: Session | null) {
      try {
        if (!session) {
          dispatch({ type: "AUTH_LOGOUT" });
          return;
        }

        const resolved = await resolveUserRoles(session.user.id);
        if (cancelled) return;

        const activeRole = resolveActiveRole(resolved.roles);
        const user = mapSupabaseUser(session.user, resolved, activeRole);

        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user, token: session.access_token },
        });

        // if (shouldRedirect) {
        //   navigate(ROLE_ROUTES[activeRole]);
        // }
      } catch (err) {
        if (cancelled) return;
        console.error("useAuthSession: failed to resolve session:", err);
        dispatch({ type: "AUTH_LOGOUT" });
        navigate(ROLE_ROUTES.error);
      }
    }

    getSession()
      .then((session) => handleSession(session))
      .catch(() => dispatch({ type: "AUTH_LOGOUT" }));

    const { data: { subscription } } = onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [dispatch, navigate]);
}