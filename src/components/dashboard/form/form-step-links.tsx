import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import ErrorLabel from "./error-label";

export function FormStepLinks() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeSchema>();

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
          <div key={field.id} className="space-y-4">
            <div key={field.id} className="flex gap-2">
              <Input className="w-1/4" {...register(`links.${index}.label`)} placeholder="Label" />
              <Input className="w-3/4" {...register(`links.${index}.url`)} placeholder="URL" />
              <Button type="button" onClick={() => removeLink(index)} variant="secondary">
                Remove
              </Button>
            </div>
            <ErrorLabel error={errors.links?.[index]?.label} />
            <ErrorLabel error={errors.links?.[index]?.url} />
          </div>
        ))}
        <Button type="button" onClick={() => appendLink({ label: "", url: "" })}>
          + Add Link
        </Button>
      </CardContent>
    </Card>
  );
}
