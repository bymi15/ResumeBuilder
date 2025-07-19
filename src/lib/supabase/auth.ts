"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

export async function login(email: string, password: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signup(credentials: SignUpWithPasswordCredentials) {
  const supabase = await createSupabaseServerClient();
  return await supabase.auth.signUp(credentials);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  return await supabase.auth.signOut();
}

export async function loginWithGithub(nextUrl?: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${nextUrl || ""}`,
    },
  });
}
