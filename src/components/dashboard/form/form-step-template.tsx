"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { Controller, useFormContext } from "react-hook-form";
import TemplateLayoutSelector from "./template-layout-selector";
import TemplateThemeSelector from "./template-theme-selector";

export default function FormStepTemplate() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeSchema>();
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
                selected={field.value}
              />
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
