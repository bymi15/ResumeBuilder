"use client";

import { ResumeSchema } from "@/lib/supabase/resumes/schema";
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
      <Template
        className={cn(
          "max-w-4xl print:w-[794px] print:h-[1123px] w-[794px] h-[1123px] print:overflow-hidden",
          className
        )}
        ref={ref}
        data={data}
      />
    );
  }
);

export default TemplateRenderer;
