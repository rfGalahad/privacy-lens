import { createContext } from "react";

// ─────────────────────────────────────────────
// Models
// ─────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "guest";
  avatarUrl?: string;
}

// ─────────────────────────────────────────────
// State & Context Value
// ─────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

// ─────────────────────────────────────────────
// Reducer Types
// ─────────────────────────────────────────────

export type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: User; token: string } }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "CLEAR_ERROR" };

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

export const AuthContext = createContext<AuthContextValue | null>(null);