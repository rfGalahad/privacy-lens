import type { User } from "@supabase/supabase-js";
import { supabaseAdmin } from "./supabaseAdmin.ts";


export async function getUser(req: Request): Promise<User | null> {
  const header = req.headers.get("Authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  return error ? null : data.user;
}