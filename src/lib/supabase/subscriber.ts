import { supabase } from "./client";

export function getSubscriberByAuthId(authUserId: string) {
  return supabase
    .from("subscribers")
    .select("subscriber_id, automated_pia_users(user_id), first_name, middle_name, last_name, suffix")
    .eq("auth_user_id", authUserId)
    .maybeSingle();
}