import { User, UserAttributes } from "@supabase/supabase-js";
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

export async function updateAuthUser(attributes: UserAttributes): Promise<void> {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.auth.updateUser(attributes);
  if (error) throw error;
}

export async function deleteAuthUser(): Promise<void> {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.rpc("delete_user");
  if (error) throw error;
}
