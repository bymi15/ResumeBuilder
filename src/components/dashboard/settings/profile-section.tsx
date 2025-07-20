"use client";

import { User } from "@supabase/supabase-js";

export function ProfileSection({ authUser }: { authUser: User }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <p className="text-muted-foreground">
          {authUser.user_metadata.full_name || authUser.user_metadata.name || "No name provided"}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <p className="text-muted-foreground">{authUser.email || "No email provided"}</p>
      </div>
    </div>
  );
}
