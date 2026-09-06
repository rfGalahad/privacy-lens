import { supabase } from "@/lib/supabase/client";
import type { AuthChangeEvent } from "@supabase/supabase-js";
import type { User, UserRole } from "@/features/auth/types";
import { getFullName } from "@/utils/string";
import { getAdminById } from "./admin";
import { getSubscriberByAuthId } from "./subscriber";

type ResolvedRoles = {
  roles: UserRole[];
  name: string | undefined;
};

const ROLE_PRIORITY: UserRole[] = ["admin", "subscriber"];

export const ROLE_ROUTES: Record<UserRole, string> = {
  admin: "/admin/dashboard",
  subscriber: "/users/dashboard",
  unknown: "/subscribe",
  error: "/auth/error",
};


export function mapSupabaseUser(
  supabaseUser: NonNullable<Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"]>,
  resolved: ResolvedRoles,
  activeRole: UserRole
): User {
  const metadata = supabaseUser.user_metadata ?? {};
  const joinedName = [metadata.given_name, metadata.family_name].filter(Boolean).join(" ");
  const metadataName = metadata.full_name ?? metadata.name ?? (joinedName || undefined);

  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? metadata.email ?? "",
    roles: resolved.roles,
    activeRole,
    name: resolved.name ?? metadataName,
  };
}

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]) => void
) {
  return supabase.auth.onAuthStateChange(callback);
}

export function isEmailLinkEvent(event: AuthChangeEvent): boolean {
  return event === "SIGNED_IN" || event === "PASSWORD_RECOVERY";
}

export async function resolveUserRoles(authUserId: string): Promise<ResolvedRoles> {
  const roles: UserRole[] = [];
  let name: string | undefined;

  const { data: admin, error: adminError } = await getAdminById(authUserId);
  if (adminError) return { roles: ["error"], name: undefined };
  if (admin) {
    roles.push("admin");
    name = admin.name ?? undefined;
  }

  const { data: subscriber, error: subscriberError } = await getSubscriberByAuthId(authUserId);
  if (subscriberError) return { roles: ["error"], name: undefined };
  if (subscriber) {
    roles.push("subscriber");
    name = name ?? getFullName(subscriber) ?? undefined;
  }

  if (roles.length === 0) {
    return { roles: ["unknown"], name: undefined };
  }

  return { roles, name };
}

const ACTIVE_ROLE_KEY = "activeRole";

export function resolveActiveRole(roles: UserRole[]): UserRole {
  const stored = localStorage.getItem(ACTIVE_ROLE_KEY) as UserRole | null;
  if (stored && roles.includes(stored)) return stored;

  for (const candidate of ROLE_PRIORITY) {
    if (roles.includes(candidate)) return candidate;
  }
  return roles[0];
}

export function persistActiveRole(role: UserRole) {
  localStorage.setItem(ACTIVE_ROLE_KEY, role);
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signInWithPassword(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) throw new Error("No user found");

  const resolved = await resolveUserRoles(data.user.id);
  const activeRole = resolveActiveRole(resolved.roles);
  return mapSupabaseUser(data.user, resolved, activeRole);
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}