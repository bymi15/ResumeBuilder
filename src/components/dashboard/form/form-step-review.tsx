import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeSchema } from "@/lib/supabase/resumes/schema";
import { memo, useState } from "react";
import { FieldErrors, UseFormWatch } from "react-hook-form";
import TemplateRenderer from "../templates/template-renderer";

export const FormStepReview = memo(function FormStepReview({
  watch,
  errors,
  resumeTitle,
  setResumeTitle,
}: {
  watch: UseFormWatch<ResumeSchema>;
  errors: FieldErrors<ResumeSchema>;
  resumeTitle: string;
  setResumeTitle: (title: string) => void;
}) {
  const [blurred, setBlurred] = useState(false);

  const resumeData = watch(); // gets all values

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Review Your Resume</h2>
          {Object.keys(errors).length > 0 ? (
            <div className="text-red-600 text-sm">
              <p>Please fix the following errors before proceeding:</p>
              <ul className="list-disc list-inside space-y-2">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>{error.message}</li>
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
          <div className="relative overflow-hidden bg-white h-[600px]">
            <TemplateRenderer className="scale-[0.5] origin-top text-left" data={resumeData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
