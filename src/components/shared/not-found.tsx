import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound({ message = "Resource not found." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Not Found</h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
