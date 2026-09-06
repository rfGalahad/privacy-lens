import { useNavigate } from "react-router-dom";
import { ROLE_ROUTES, persistActiveRole } from "@/lib/supabase/auth";
import type { Dispatch } from "react";
import type { AuthAction, User, UserRole } from "../types";

export function useSwitchRole(user: User | null, dispatch: Dispatch<AuthAction>) {
  const navigate = useNavigate();

  return function switchRole(role: UserRole) {
    if (!user) {
      console.warn("Cannot switch role: no authenticated user.");
      return;
    }
    if (!user.roles.includes(role)) {
      console.warn(`Cannot switch to role "${role}": user does not hold it.`);
      return;
    }

    persistActiveRole(role);
    dispatch({ type: "SWITCH_ROLE", payload: { activeRole: role } });
    navigate(ROLE_ROUTES[role]);
  };
}