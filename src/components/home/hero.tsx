"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../shared/theme-toggle";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#e0e7ff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] overflow-hidden">
      {/* Theme Toggle Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Blurred gradient blobs */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-300 to-violet-400 rounded-full blur-[160px] opacity-40 dark:from-indigo-700 dark:to-violet-800" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] bg-gradient-to-br from-sky-300 to-cyan-400 rounded-full blur-[100px] opacity-30 dark:from-sky-600 dark:to-cyan-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gradient-to-tl from-pink-200 to-purple-300 rounded-full blur-[80px] opacity-20 dark:from-pink-600 dark:to-purple-800" />
      </div>

      <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-y-16 md:gap-12 py-24">
        {/* Text Content */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
            Professional Resumes Made Effortless
          </h1>
          <p className="text-muted-foreground font-medium text-lg max-w-xl mx-auto md:mx-0">
            The easiest way to create beautiful, professional resumes. Choose from modern templates,
            customize freely, and download instantly — no design skills needed.
          </p>
          <Link href="/dashboard" passHref>
            <Button size="lg" asChild>
              <span>Build Your Resume</span>
            </Button>
          </Link>
        </div>

        {/* Resume Preview */}
        <motion.div
          className="relative w-full max-w-[350px] aspect-[1/1.414] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/sampleresume.jpg"
            alt="Preview of a modern resume created with StyledResume"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
