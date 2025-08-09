"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { MouseEvent } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { PdfImportButton } from "./pdf-import-button";

export default function FormStepImport({
  nextStep,
}: {
  nextStep: (e?: MouseEvent<HTMLButtonElement>) => void;
}) {
  const { reset } = useFormContext<ResumeSchema>();
  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <PdfImportButton
          onImport={(parsedData) => {
            reset(parsedData);
            nextStep();
            toast.success("Resume imported successfully!");
          }}
        />
      </CardContent>
    </Card>
  );
}
