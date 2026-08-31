import { useEffect } from "react";
import type { Dispatch } from "react";
import type { Session } from "@supabase/supabase-js";

import {
  getSession,
  onAuthStateChange,
  mapSupabaseUser,
  resolveUserRole,
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
      if (!session) {
        dispatch({ type: "AUTH_LOGOUT" });
        return;
      }

      const resolved = await resolveUserRole(session.user.id);

      if (cancelled) return;

      if (resolved.role === "unknown") {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user: mapSupabaseUser(session.user, resolved), token: session.access_token },
        });
        navigate("/subscribe");
        return;
      }

      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          user: mapSupabaseUser(session.user, resolved),
          token: session.access_token,
        },
      });
    }

    getSession()
      .then(handleSession)
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