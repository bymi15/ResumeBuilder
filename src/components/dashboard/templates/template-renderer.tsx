"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTemplateByID } from "@/hooks/shared/use-template-by-id";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { getTemplateTheme } from "./themes";

interface TemplateRendererProps {
  data: ResumeSchema;
  className?: string;
}

const TemplateRenderer = forwardRef<HTMLDivElement, TemplateRendererProps>(
  ({ data, className }, ref) => {
    const { Template, isPending, isError } = useTemplateByID(data.template);

    if (isPending) {
      return (
        <div className="flex justify-center">
          <Skeleton
            className={cn(
              "relative w-full max-w-[794px] mx-auto rounded-2xl shadow-md overflow-hidden aspect-[794/1123]",
              className
            )}
          >
            <div className="absolute inset-0 bg-muted animate-pulse" />
          </Skeleton>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="p-6 text-center text-muted-foreground">
          <p>Failed to load template. Please try again later.</p>
        </div>
      );
    }

    if (!Template) {
      return (
        <div className="p-6 text-center text-muted-foreground">
          <p>Invalid template selected.</p>
        </div>
      );
    }

    const theme = getTemplateTheme(data.templateTheme).theme;

    return (
      <>
        {/* Mobile version (scaled to fit width) */}
        <div className="block md:hidden">
          <Template data={data} theme={theme} className="pointer-events-none" />
        </div>
        {/* Desktop + print version (full size) */}
        <div className="hidden md:block print:block">
          <Template
            ref={ref}
            data={data}
            theme={theme}
            className={cn(
              "w-[794px] min-h-[1123px] mx-auto print:w-[794px] print:min-h-[1123px] print:overflow-hidden",
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
