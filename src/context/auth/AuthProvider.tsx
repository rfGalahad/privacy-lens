import { useCallback, useEffect, useMemo, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthAction, AuthContextValue, AuthState, User } from "./AuthContext";

// ─────────────────────────────────────────────
// Reducer
// ─────────────────────────────────────────────

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true, // true on mount so we can check persisted session
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null };
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "AUTH_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "AUTH_LOGOUT":
      return { ...initialState, isLoading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────
// Storage helpers (swap with a cookie lib if needed)
// ─────────────────────────────────────────────

const TOKEN_KEY = "auth_token";

const storage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
};

// ─────────────────────────────────────────────
// API calls — replace with your real service
// ─────────────────────────────────────────────

async function apiLogin(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  // Replace with: return axios.post('/auth/login', { email, password })
  await new Promise((res) => setTimeout(res, 800));

  if (email === "demo@example.com" && password === "password") {
    return {
      token: "mock_jwt_token_abc123",
      user: {
        id: "usr_001",
        email,
        name: "Demo User",
        role: "user",
        avatarUrl: "https://i.pravatar.cc/150?u=demo",
      },
    };
  }

  throw new Error("Invalid credentials");
}

async function apiFetchMe(token: string): Promise<User> {
  // Replace with: return axios.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
  await new Promise((res) => setTimeout(res, 400));

  if (token === "mock_jwt_token_abc123") {
    return {
      id: "usr_001",
      email: "demo@example.com",
      name: "Demo User",
      role: "user",
      avatarUrl: "https://i.pravatar.cc/150?u=demo",
    };
  }

  throw new Error("Session expired");
}

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Rehydrate session on mount
  useEffect(() => {
    const token = storage.getToken();

    if (!token) {
      dispatch({ type: "AUTH_LOGOUT" });
      return;
    }

    apiFetchMe(token)
      .then((user) =>
        dispatch({ type: "AUTH_SUCCESS", payload: { user, token } })
      )
      .catch(() => {
        storage.removeToken();
        dispatch({ type: "AUTH_LOGOUT" });
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { user, token } = await apiLogin(email, password);
      storage.setToken(token);
      dispatch({ type: "AUTH_SUCCESS", payload: { user, token } });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      dispatch({ type: "AUTH_FAILURE", payload: message });
    }
  }, []);

  const logout = useCallback(() => {
    storage.removeToken();
    dispatch({ type: "AUTH_LOGOUT" });
    // Optionally call server to invalidate token:
    // apiLogout(state.token).catch(noop)
  }, []);

  const refreshUser = useCallback(async () => {
    const token = storage.getToken();
    if (!token) return;

    dispatch({ type: "AUTH_START" });
    try {
      const user = await apiFetchMe(token);
      dispatch({ type: "AUTH_SUCCESS", payload: { user, token } });
    } catch {
      storage.removeToken();
      dispatch({ type: "AUTH_LOGOUT" });
    }
  }, []);

  const clearError = useCallback(
    () => dispatch({ type: "CLEAR_ERROR" }),
    []
  );

  // Memoised so consumers only re-render when state actually changes
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