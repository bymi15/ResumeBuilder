import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { useState } from "react";
import { FieldError, FieldErrors, useFormContext } from "react-hook-form";
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
}: {
  resumeTitle: string;
  setResumeTitle: (title: string) => void;
}) {
  const {
    watch,
    formState: { errors },
  } = useFormContext<ResumeSchema>();

  const [blurred, setBlurred] = useState(false);

  const resumeData = watch(); // gets all values

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Review Your Resume</h2>
          {Object.keys(errors).length > 0 ? (
            <div className="text-red-600 text-sm text-left">
              <p>Please fix the following errors before proceeding:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                {extractErrors(errors).map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          ) : (
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
          )}
          {resumeData.template && Object.keys(errors).length === 0 && (
            <div className="relative overflow-hidden bg-white h-[600px]">
              <TemplateRenderer className="scale-[0.5] origin-top text-left" data={resumeData} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
