"use client";

import NotFound from "@/components/shared/not-found";
import { Button } from "@/components/ui/button";
import { processResume } from "@/lib/utils";
import { TemplateProps } from "@/types/template";
import { ArrowLeftIcon, FilePlus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { mockResume } from "./mocks/mock-resume";
import TemplateRenderer from "./template-renderer";
import { resumeTemplates } from "./templates";
import { getTemplateTheme } from "./themes";

export default function TemplatePreview({
  Template,
}: {
  Template?: ForwardRefExoticComponent<TemplateProps & RefAttributes<HTMLDivElement>>;
}) {
  const { id } = useParams<{ id: string }>();

  const template = resumeTemplates.find((t) => t.id === id);
  if (!template) {
    return <NotFound />;
  }

  return Template ? (
    <div className="p-0 m-0">
      <Template
        className="mx-0 w-[794px] min-h-[1123px]"
        data={processResume(mockResume)}
        theme={getTemplateTheme(mockResume.templateTheme).theme}
      />
    </div>
  ) : (
    <div className="p-6 space-y-6">
      <div className="sticky top-[--header-height] z-10 bg-background py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b">
        <div>
          <h1 className="text-2xl font-semibold">Resume Title</h1>
          <p className="text-sm text-muted-foreground">{template.name} template</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/templates" passHref>
            <Button variant="outline" asChild>
              <span className="flex items-center gap-2">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Templates
              </span>
            </Button>
          </Link>

          <Link href={`/dashboard/form`} passHref>
            <Button asChild>
              <span className="flex items-center gap-2">
                <FilePlus className="w-4 h-4" />
                Create Resume
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-muted rounded-xl shadow-md overflow-hidden py-8 px-4 sm:px-6">
        <TemplateRenderer data={{ ...processResume(mockResume), template: template.id }} />
      </div>
    </div>
  );
}
