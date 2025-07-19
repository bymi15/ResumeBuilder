"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ResumeRecord } from "@/lib/supabase/resumes/types";
import { humaniseDateToNow } from "@/lib/utils";
import Link from "next/link";

interface ResumeCardProps {
  resume: ResumeRecord;
}

export function ResumeCard({ resume: { id, title, updated_at } }: ResumeCardProps) {
  return (
    <Link href={`/dashboard/resume/${id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-4 flex flex-col items-center justify-center gap-y-2 h-32">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Last updated {humaniseDateToNow(updated_at)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
