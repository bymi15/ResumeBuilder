export const runtime = "edge";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  missing_code: "Authorization code is missing. Please try signing in again.",
  session_exchange_failed: "We couldn't sign you in. Please try again later.",
  unexpected_error: "An unexpected error occurred. Please try again.",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { reason } = await searchParams;
  const message =
    errorMessages[typeof reason === "string" ? reason : ""] ||
    "Authentication failed. Please try again.";

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Authentication Error</h1>
        </div>
        <p className="text-gray-600">{message}</p>
        <Button asChild>
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    </main>
  );
}
