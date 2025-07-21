import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GoodbyePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-6">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-destructive">{"We're sad to see you go 💔"}</h1>
        <p className="text-muted-foreground text-lg">
          Your account has been successfully deleted. We hope to see you again in the future!
        </p>

        <div className="mt-6">
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
