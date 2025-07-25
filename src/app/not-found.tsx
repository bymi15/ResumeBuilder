"use client";

import NotFound from "@/components/shared/not-found";

export const runtime = "edge";

export default function NotFoundPage() {
  return (
    <div className="h-[calc(100vh-100px)] w-full flex items-center justify-center">
      <NotFound />
    </div>
  );
}
