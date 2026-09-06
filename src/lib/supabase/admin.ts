import { supabase } from "./client";

export function getAdminById(authUserId: string) {
  return supabase
    .from("admins")
    .select("id, name")
    .eq("id", authUserId)
    .maybeSingle();
}