import { useCallback, useMemo, useReducer } from "react";

import { useToast } from "@/components/ui/Toast";
import {
  signInWithPassword,
  signOut,
  getCurrentUser,
} from "@/lib/supabase/auth";

import { AuthContext } from "../context/authContext";
import { authReducer, initialState } from "../reducer/authReducer";
import { useAuthSession } from "../hooks/useAuthSession";
import type { AuthContextValue, AuthProviderProps } from "../types";
import { useNavigate } from "react-router-dom";


export function AuthProvider({ children }: AuthProviderProps) {

  const navigate = useNavigate();
  const toast = useToast();
  const [state, dispatch] = useReducer(authReducer, initialState);

  useAuthSession(dispatch);

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: "AUTH_INIT" });
    try {
      await signInWithPassword(email, password);
      toast.success("Signed in successfully!");
      // onAuthStateChange (in useAuthSession) fires AUTH_SUCCESS
    } catch (err) {
      dispatch({
        type: "AUTH_FAILURE",
        payload: err instanceof Error ? err.message : "Login failed",
      });
    }
  }, [toast]);

  const logout = useCallback(async () => {
    try {
      await signOut();
      dispatch({ type: "AUTH_LOGOUT" });
      navigate("/login")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Logout failed");
    }
  }, [navigate, toast]);

  const refreshUser = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      dispatch({ type: "REFRESH_USER", payload: user });
    } catch (err) {
      dispatch({
        type: "AUTH_FAILURE",
        payload: err instanceof Error ? err.message : "Failed to refresh user",
      });
    }
  }, []);

  const clearError = useCallback(() => dispatch({ type: "CLEAR_ERROR" }), []);

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 