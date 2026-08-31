import { supabase } from "@/lib/supabase/client";
import type { AuthChangeEvent } from "@supabase/supabase-js";
import type { User, UserRole } from "@/features/auth/types";
import { getFullName } from "@/utils/string";

type ResolvedRole = {
  role: UserRole;
  name: string | undefined;
};

export function mapSupabaseUser(
  supabaseUser: NonNullable<Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"]>,
  resolved: ResolvedRole
): User {
  const metadata = supabaseUser.user_metadata ?? {};

  const joinedName = [metadata.given_name, metadata.family_name]
    .filter(Boolean)
    .join(" ");

  const metadataName =
    metadata.full_name ?? metadata.name ?? (joinedName || undefined);

  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? metadata.email ?? "",
    role: resolved.role,
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

export async function resolveUserRole(authUserId: string): Promise<ResolvedRole> {
  const { data: admin } = await supabase
    .from("admins")
    .select("id, name")
    .eq("id", authUserId)
    .maybeSingle();
  if (admin) return { role: "admin", name: admin.name ?? undefined };

  const { data: subscriber, error } = await supabase
    .from("subscribers")
    .select("subscriber_id, automated_pia_users(user_id), first_name, middle_name, last_name, suffix")
    .eq("auth_user_id", authUserId)
    .maybeSingle();

  if (error) {
    console.error("resolveUserRole subscriber query failed:", error);
  }

  if (subscriber) {
    return { role: "subscriber", name: getFullName(subscriber) ?? undefined };
  }

  return { role: "unknown", name: undefined };
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

  const resolved = await resolveUserRole(data.user.id);
  return mapSupabaseUser(data.user, resolved);
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

