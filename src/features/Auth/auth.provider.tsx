import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { supabase } from "@/lib/supabaseClient"; 

import { AuthContext } from "./auth.context";
import type {
  AuthAction,
  AuthContextValue,
  AuthProviderProps,
  AuthState,
  User,
} from "./auth.types";

// ─────────────────────────────────────────────
// Initial state
// ─────────────────────────────────────────────

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true, 
  error: null,
};

// ─────────────────────────────────────────────
// Reducer
// ─────────────────────────────────────────────

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_INIT":
      return { ...state, isLoading: true, error: null };

    case "AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case "AUTH_FAILURE":
      return {
        ...state,
        isLoading: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case "AUTH_LOGOUT":
      return { ...initialState, isLoading: false };

    case "REFRESH_USER":
      return { ...state, user: action.payload };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Map a Supabase user object to your app's User type. Extend as needed. */
function mapSupabaseUser(supabaseUser: NonNullable<Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"]>): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? "",
    // add other fields your User type requires, e.g.:
    // name: supabaseUser.user_metadata?.full_name,
    // avatarUrl: supabaseUser.user_metadata?.avatar_url,
  } as User;
}

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ── Session rehydration + real-time auth state listener ──────────────
  useEffect(() => {
    // getSession() returns the persisted session from storage synchronously
    // (Supabase handles token storage internally — no manual storage helpers needed)
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) {
        dispatch({ type: "AUTH_LOGOUT" });
        return;
      }
      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          user: mapSupabaseUser(session.user),
          token: session.access_token,
        },
      });
    });

    // Subscribe to future auth changes (sign-in, sign-out, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: {
            user: mapSupabaseUser(session.user),
            token: session.access_token,
          },
        });
      } else {
        dispatch({ type: "AUTH_LOGOUT" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Actions ───────────────────────────────────────────────────────────

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: "AUTH_INIT" });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      dispatch({ type: "AUTH_FAILURE", payload: error.message });
    }
    // On success, onAuthStateChange fires AUTH_SUCCESS automatically
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    // onAuthStateChange fires AUTH_LOGOUT automatically
  }, []);

  const refreshUser = useCallback(async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      dispatch({ type: "AUTH_FAILURE", payload: error?.message ?? "Failed to refresh user" });
      return;
    }
    dispatch({ type: "REFRESH_USER", payload: mapSupabaseUser(user) });
  }, []);

  const clearError = useCallback(() => dispatch({ type: "CLEAR_ERROR" }), []);

  // ── Context value ─────────────────────────────────────────────────────

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: !!state.user && !!state.token,
      login,
      logout,
      refreshUser,
      clearError,
    }),
    [state, login, logout, refreshUser, clearError]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}