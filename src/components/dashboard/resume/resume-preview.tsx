"use client";

import NotFound from "@/components/shared/not-found";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useResumeByIdQuery } from "@/hooks/api/resumes/use-resume-by-id-query";
import { humaniseDateToNow } from "@/lib/utils";
import { ArrowLeftIcon, DownloadIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import TemplateRenderer from "../templates/template-renderer";

export default function ResumePreview() {
  const { id } = useParams<{ id: string }>();
  const { data: resume, isPending, isError } = useResumeByIdQuery(id);

  const contentRef = useRef(null);
  const onPrint = useReactToPrint({
    contentRef,
    documentTitle: "resume",
    pageStyle: `
      @page { margin: 0; size: A4; }
      @media print {
        html,
        body {
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      
        * {
          box-shadow: none !important;
          overflow: visible !important;
        }
      
        .page-break {
          break-after: always;
        }
      }
    `,
  });

  if (isPending) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-[600px] w-full rounded-md" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p className="text-lg">⚠️ Failed to load resume. Please try again later.</p>
      </div>
    );
  }

  if (!resume) return <NotFound />;

  return (
    <div className="p-6 space-y-6">
      <div className="sticky top-[--header-height] z-10 bg-background py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b">
        <div>
          <h1 className="text-2xl font-semibold">{resume.title}</h1>
          <p className="text-sm text-muted-foreground">
            Created {humaniseDateToNow(resume.created_at)} • Last updated{" "}
            {humaniseDateToNow(resume.updated_at)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard" passHref>
            <Button variant="outline" asChild>
              <span className="flex items-center gap-2">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Dashboard
              </span>
            </Button>
          </Link>

          <Link href={`/dashboard/resume/${resume.id}/edit`} passHref>
            <Button variant="secondary" asChild>
              <span className="flex items-center gap-2">
                <PencilIcon className="w-4 h-4" />
                Edit Resume
              </span>
            </Button>
          </Link>

          <Button onClick={onPrint} className="gap-2 cursor-pointer">
            <DownloadIcon className="w-4 h-4" />
            Download / Print
          </Button>
        </div>
      </div>
      <div className="bg-muted rounded-xl shadow-md overflow-hidden py-8 px-4 sm:px-6">
        <TemplateRenderer ref={contentRef} data={resume.data} />
      </div>
    </div>
  );
}
