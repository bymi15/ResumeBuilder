"use client";

import { Card, CardContent } from "@/components/ui/card";
import { templates } from "@/lib/consts";
import Link from "next/link";

interface TemplateCardProps {
  template: (typeof templates)[0];
}

export function TemplateCard({ template: { id, name, thumbnail } }: TemplateCardProps) {
  return (
    <Link href={`/dashboard/templates/${id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-4 flex flex-col items-center justify-center gap-y-2 h-32">
          <h3 className="text-lg font-medium">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
