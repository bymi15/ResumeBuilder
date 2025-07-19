"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    getSession();
  }, []);

  return session;
}
