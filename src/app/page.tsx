import CallToAction from "@/components/home/cta";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import { Metrics } from "@/components/home/metrics";

export const runtime = "edge";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <Features />
        <Metrics />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
