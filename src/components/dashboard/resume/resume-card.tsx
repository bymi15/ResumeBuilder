"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteResumeMutation } from "@/hooks/api/resumes/use-delete-resume-mutation";
import { ResumeRecord } from "@/lib/supabase/resumes/types";
import { MoreVertical, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface ResumeCardProps {
  resume: ResumeRecord;
}

export function ResumeCard({ resume: { id, title, updated_at } }: ResumeCardProps) {
  const { mutateAsync: deleteResume, isPending: isDeletingResume } = useDeleteResumeMutation();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resume? This action is irreversible."))
      return;
    try {
      await deleteResume(id);
      toast.success("Resume deleted successfully");
    } catch (err) {
      toast.error("Failed to delete resume. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Link href={`/dashboard/resume/${id}`}>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-40">
          <CardHeader className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-xs text-muted-foreground">
                Last updated {new Date(updated_at).toLocaleDateString()}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/dashboard/resume/${id}/edit`} passHref>
                  <DropdownMenuItem>
                    <PencilIcon className="mr-2 h-4 w-4" /> Edit Resume
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  variant="destructive"
                  disabled={isDeletingResume}
                >
                  <TrashIcon className="mr-2 h-4 w-4 text-red-600" />{" "}
                  {isDeletingResume ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
        </Card>
      </Link>
    </>
  );
}
