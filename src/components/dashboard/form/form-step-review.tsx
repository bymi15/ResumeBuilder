import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { processResume } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FieldError, FieldErrors, useFormContext } from "react-hook-form";
import { isValid } from "zod";
import TemplateRenderer from "../templates/template-renderer";

type AnyFieldError = FieldError | FieldErrors | Record<string, unknown> | undefined;

function prettifyPath(path: string): string {
  // Convert something like "projects[0].title" to "Project 1 – Title"
  return (
    path
      // Replace [0] with " 1", [1] with " 2", etc.
      .replace(/\[(\d+)\]/g, (_, index) => ` ${Number(index) + 1}`)
      // Replace dots with " – " and capitalize each segment
      .split(".")
      .map((segment) =>
        segment
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
      .join(" - ")
  );
}

const SKIP_KEYS = new Set([
  "dateRange",
  "date",
  "value",
  "from",
  "to",
  "url",
  "label",
  "title",
  "company",
  "institute",
  "course",
  "type",
]);

function isPlainObject(obj: unknown): obj is Record<string, unknown> {
  return (
    obj !== null &&
    typeof obj === "object" &&
    Object.prototype.toString.call(obj) === "[object Object]"
  );
}

export function extractErrors(
  errors: AnyFieldError,
  path = "",
  visited = new WeakSet<object>()
): string[] {
  const messages: string[] = [];

  if (!isPlainObject(errors)) return messages;

  if (visited.has(errors)) return messages; // Prevent infinite recursion
  visited.add(errors);

  for (const key in errors) {
    const value = (errors as Record<string, unknown>)[key];
    if (!value) continue;

    const isSkippedKey = SKIP_KEYS.has(key);
    const currentPath = isSkippedKey ? path : path ? `${path}.${key}` : key;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        messages.push(...extractErrors(item, `${currentPath}[${index}]`, visited));
      });
    } else if (isPlainObject(value) && "message" in value) {
      const msg = (value as FieldError).message;
      if (typeof msg === "string") {
        messages.push(`${prettifyPath(currentPath)}: ${msg}`);
      }
    } else if (isPlainObject(value)) {
      messages.push(...extractErrors(value, currentPath, visited));
    }
  }

  return messages;
}

export function FormStepReview({
  resumeTitle,
  setResumeTitle,
  isEditMode,
}: {
  resumeTitle: string;
  setResumeTitle: (title: string) => void;
  isEditMode: boolean;
}) {
  const {
    watch,
    formState: { errors },
  } = useFormContext<ResumeSchema>();

  const [blurred, setBlurred] = useState(false);

  const resumeData = watch(); // gets all values

  return (
    <>
      <Card className="mb-3">
        <CardContent className="space-y-4">
          <div>
            <div className="space-y-2 text-left">
              <Label htmlFor="resumeTitle">Resume Title</Label>
              <Input
                id="resumeTitle"
                placeholder="e.g. Frontend Engineer Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                onBlur={() => setBlurred(true)}
              />
              {blurred && !resumeTitle.trim() ? (
                <p className="ml-2 text-xs text-red-500">Resume title is required</p>
              ) : null}
            </div>
          </div>
          {resumeData.template && Object.keys(errors).length === 0 && (
            <div className="relative overflow-hidden bg-white h-[600px]">
              <TemplateRenderer
                className="scale-[0.5] origin-top text-left"
                data={processResume(resumeData)}
              />
            </div>
          )}
        </CardContent>
      </Card>
      {Object.keys(errors).length > 0 ? (
        <div className="flex flex-col gap-3">
          <div className="text-red-600 text-sm text-left">
            <p>Please fix the following errors before proceeding:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {extractErrors(errors).map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
          <Link href="/dashboard" passHref>
            <Button type="button" variant="secondary" asChild>
              <span className="flex items-center gap-2">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Dashboard
              </span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-between">
          <Link href="/dashboard" passHref>
            <Button type="button" variant="secondary" asChild>
              <span className="flex items-center gap-2">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Dashboard
              </span>
            </Button>
          </Link>
          <Button type="submit" disabled={!isValid || !resumeTitle.trim()}>
            {isEditMode ? "Save" : "Create"} Resume
          </Button>
        </div>
      )}
    </>
  );
}
