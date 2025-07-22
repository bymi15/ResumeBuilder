import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 text-center bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold mb-4">Ready to Build Your Resume?</h2>
        <p className="text-lg mb-6">It only takes a few minutes to stand out.</p>
        <Link href="/dashboard" passHref>
          <Button size="lg" variant="secondary" asChild>
            <span>Build Your Resume</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
