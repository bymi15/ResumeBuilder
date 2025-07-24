"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

export function EmptyCard() {
  return (
    <Link href="/dashboard/form">
      <Card className="border-2 border-dashed border-gray-300 hover:shadow-md cursor-pointer transition h-40">
        <CardContent className="p-6 flex flex-col items-center justify-center text-muted-foreground">
          <Plus className="w-6 h-6 mb-2" />
          <p>Create new resume</p>
        </CardContent>
      </Card>
    </Link>
  );
}
