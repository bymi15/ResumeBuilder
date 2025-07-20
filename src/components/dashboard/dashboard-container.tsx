"use client";

import { cn } from "@/lib/utils";

export function DashboardContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <main className={cn("container p-6 px-10", className)}>{children}</main>;
}
