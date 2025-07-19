"use client";

import { useMetricsQuery } from "@/hooks/api/metrics/use-metrics-query";
import { motion } from "framer-motion";
import { FileText, Users } from "lucide-react";
import CountUp from "react-countup";

const stats = [
  {
    label: "Users",
    icon: Users,
    key: "user_count" as const,
    color: "from-blue-400 to-blue-600",
  },
  {
    label: "Resumes Created",
    icon: FileText,
    key: "resume_count" as const,
    color: "from-purple-400 to-purple-600",
  },
];

export function Metrics() {
  const { data, isPending } = useMetricsQuery();

  return (
    <section className="relative py-20 bg-background border-t border-border">
      <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-primary">Empowering Your Career Journey</h2>
        <p className="text-muted-foreground mb-10 text-lg">
          Join professionals worldwide creating impactful resumes — all in your browser.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const value = data?.[stat.key] ?? 0;

            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`relative group p-8 rounded-3xl bg-white/30 dark:bg-black/90 border border-border shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Animated Border Pulse */}
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-30 blur-lg group-hover:opacity-50 animate-pulse pointer-events-none z-0 group-hover:scale-105 scale-100 transition-transform duration-500 ease-out
                from-transparent to-transparent group-hover:from-white/20 group-hover:to-white/5"
                />

                <div className="relative z-10 flex items-center gap-5">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.color} text-white shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-start gap-1 text-left">
                    <h3 className="text-2xl font-bold text-foreground">
                      {isPending ? "..." : <CountUp end={value} duration={2} separator="," />}
                    </h3>
                    <p className="text-base text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Optional Background Gradient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-transparent via-muted/40 to-transparent dark:via-muted/20" />
    </section>
  );
}
