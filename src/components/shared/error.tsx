"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  message = "An unknown error has occurred",
  error,
  reset,
}: {
  message?: string;
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
      {reset ? (
        <Button variant="secondary" onClick={reset}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
