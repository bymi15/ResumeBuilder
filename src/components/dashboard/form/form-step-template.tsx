"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ResumeSchema } from "@/lib/supabase/resumes/schema";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { getTemplateTheme } from "../templates/template-registry";
import TemplateLayoutSelector from "./template-layout-selector";
import TemplateThemeSelector from "./template-theme-selector";

export default function FormStepTemplate({
  control,
  setValue,
}: {
  setValue: UseFormSetValue<ResumeSchema>;
  control: Control<ResumeSchema>;
}) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Template Layout</h2>
          <Controller
            name="template"
            control={control}
            render={({ field }) => (
              <TemplateLayoutSelector
                onSelect={(template) => {
                  setValue("template", template);
                }}
                selected={field.value}
              />
            )}
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Template Theme</h2>
          <Controller
            name="templateTheme"
            control={control}
            render={({ field }) => (
              <TemplateThemeSelector
                onSelect={(templateTheme) => {
                  setValue("templateTheme", templateTheme.id);
                }}
                selected={getTemplateTheme(field.value)}
              />
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
