import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (!code) {
      console.warn("Missing `code` parameter in request");
      return NextResponse.redirect(`${origin}/auth/error?reason=missing_code`);
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      return NextResponse.redirect(`${origin}/auth/error?reason=session_exchange_failed`);
    }

    return NextResponse.redirect(`${origin}${next}`);
  } catch (err) {
    console.error("Unexpected error during auth callback:", err);
    return NextResponse.redirect(`${origin}/auth/error?reason=unexpected_error`);
  }
}
