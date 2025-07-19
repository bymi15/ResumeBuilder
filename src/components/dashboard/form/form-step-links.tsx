import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResumeSchema } from "@/lib/supabase/resumes/schema";
import { memo } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

export const FormStepLinks = memo(function FormStepLinks({
  register,
  control,
}: {
  register: UseFormRegister<ResumeSchema>;
  control: Control<ResumeSchema>;
}) {
  const {
    fields: links,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({ control, name: "links" });

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Links</h2>
        {links.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input {...register(`links.${index}.label`)} placeholder="Label" />
            <Input {...register(`links.${index}.url`)} placeholder="URL" />
            <Button type="button" onClick={() => removeLink(index)} variant="secondary">
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => appendLink({ label: "", url: "" })}>
          + Add Link
        </Button>
      </CardContent>
    </Card>
  );
});
