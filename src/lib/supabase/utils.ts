import { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "./browser-client";

export async function getAuthUser(): Promise<User> {
  const supabase = createSupabaseBrowserClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Unauthorized");
  return user;
}
