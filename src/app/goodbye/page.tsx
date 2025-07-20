export default function GoodbyePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-6">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-destructive">We're sad to see you go 💔</h1>
        <p className="text-muted-foreground text-lg">
          Your account has been successfully deleted. We hope to see you again in the future!
        </p>

        <div className="mt-6">
          <a
            href="/"
            className="inline-block px-6 py-2 text-white bg-primary hover:bg-primary/90 rounded-lg font-medium transition"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
