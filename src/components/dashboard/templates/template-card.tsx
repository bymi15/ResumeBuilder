"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TemplateRegistryEntry } from "@/types/template";
import { motion } from "framer-motion";
import Link from "next/link";

interface TemplateCardProps {
  template: TemplateRegistryEntry;
}

export function TemplateCard({ template: { id, name, thumbnail } }: TemplateCardProps) {
  return (
    <Link href={`/dashboard/templates/${id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-80 py-3 gap-1">
        <motion.div
          className="flex-grow flex items-center justify-center overflow-hidden px-1 rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={thumbnail}
            alt={`${name} preview`}
            className="h-full w-auto object-contain"
            loading="lazy"
          />
        </motion.div>
        <CardContent className="p-2 text-center">
          <h3 className="text-lg font-medium">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
