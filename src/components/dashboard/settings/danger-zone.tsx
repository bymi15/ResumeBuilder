"use client";

import { Button } from "@/components/ui/button";

export function DangerZone() {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      // Delete user via API
      console.log("User deleted");
    }
  };

  return (
    <div className="border border-red-300 p-4 rounded-lg">
      <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Deleting your account is irreversible. All data will be lost.
      </p>
      <Button variant="destructive" onClick={handleDelete}>
        Delete Account
      </Button>
    </div>
  );
}
