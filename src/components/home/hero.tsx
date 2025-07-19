"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../shared/theme-toggle";

export default function Hero() {
  return (
    <section className="relative overflow-hidden h-screen flex items-center bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#e0e7ff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a]">
      {/* Theme Toggle Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Blurred gradient blobs */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
        {/* Top Left Glow */}
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-300 to-violet-400 rounded-full blur-[160px] opacity-40 dark:from-indigo-700 dark:to-violet-800" />

        {/* Bottom Right Glow */}
        <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] bg-gradient-to-br from-sky-300 to-cyan-400 rounded-full blur-[100px] opacity-30 dark:from-sky-600 dark:to-cyan-700" />

        {/* Optional center pulse (subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gradient-to-tl from-pink-200 to-purple-300 rounded-full blur-[80px] opacity-20 dark:from-pink-600 dark:to-purple-800" />
      </div>

      <div className="container relative z-10 mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6 text-foreground">
            Build your <span className="text-primary">Resume</span> Now
          </h1>
          <p className="text-muted-foreground font-medium text-lg mb-8 max-w-xl mx-auto md:mx-0">
            Create modern, professional resumes in minutes. Choose a template, customize everything,
            and export to PDF — no design skills needed.
          </p>
          <Link href="/dashboard" passHref>
            <Button size="lg" asChild>
              <span>Start Building</span>
            </Button>
          </Link>
        </div>

        {/* Animated Resume Preview */}
        <motion.div
          className="relative w-full h-[500px] max-w-[350px] rounded-2xl overflow-hidden shadow-2xl border border-border aspect-[1/1.414] mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/sampleresume.jpg"
            alt="Resume Preview"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
