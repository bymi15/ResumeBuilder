"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteAuthUserMutation } from "@/hooks/api/auth/use-delete-auth-user-mutation";
import { signOut } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function DangerZone() {
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteAuthUserMutation();

  async function handleDeleteAccount() {
    try {
      await deleteUser();
      await signOut();
      redirect("/goodbye");
    } catch (err) {
      toast.error("Failed to delete account. Please try again.");
      console.error(err);
    }
  }

  return (
    <div className="border-t pt-6 mt-6">
      <h1 className="text-2xl font-semibold text-red-600 mb-2">Danger Zone</h1>
      <p className="text-sm text-muted-foreground mb-4">
        This will permanently delete your account and all associated resumes.
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={isDeleting}>
            {isDeleting ? "Deleting account..." : "Delete My Account"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and all of
              your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteAccount}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
