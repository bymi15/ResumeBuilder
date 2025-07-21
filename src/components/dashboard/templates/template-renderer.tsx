"use client";

import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { resumeTemplates } from "./template-registry";

interface TemplateRendererProps {
  data: ResumeSchema;
  className?: string;
}

const TemplateRenderer = forwardRef<HTMLDivElement, TemplateRendererProps>(
  ({ data, className }, ref) => {
    const selected = resumeTemplates.find((t) => t.id === data.template);
    if (!selected) return <p>Invalid template selected.</p>;

    const Template = selected.component;
    return (
      <>
        {/* Mobile version (scaled to fit width) */}
        <div className="block md:hidden">
          <Template data={data} className="pointer-events-none" />
        </div>
        {/* Desktop + print version (full size) */}
        <div className="hidden md:block print:block">
          <Template
            ref={ref}
            data={data}
            className={cn(
              "w-[794px] h-[1123px] max-w-4xl mx-auto print:w-[794px] print:h-[1123px] print:overflow-hidden",
              className
            )}
          />
        </div>
      </>
    );
  }
);

TemplateRenderer.displayName = "TemplateRenderer";
export default TemplateRenderer;
