"use client";

import { useAuthUserQuery } from "@/hooks/api/auth/use-auth-user-query";
import { DashboardContainer } from "../dashboard-container";
import { AccountSection } from "./account-section";
import { DangerZone } from "./danger-zone";
import { ProfileSection } from "./profile-section";

export default function Settings() {
  const { data: authUser, isPending, isError } = useAuthUserQuery();

  return (
    <DashboardContainer className="p-10 space-y-12 py-10">
      {isPending ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : isError ? (
        <div className="text-red-500">Failed to load user data</div>
      ) : !authUser ? (
        <div className="text-muted-foreground">No user data available</div>
      ) : (
        <>
          <ProfileSection authUser={authUser} />
          <AccountSection authUser={authUser} />
          <DangerZone />
        </>
      )}
    </DashboardContainer>
  );
}
