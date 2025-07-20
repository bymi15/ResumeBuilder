import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import ErrorLabel from "./error-label";

export function FormStepSkills() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeSchema>();

  const {
    fields: skills,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        {skills.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <div className="flex gap-2">
              <Input {...register(`skills.${index}.value`)} placeholder={`Skill #${index + 1}`} />
              <Button type="button" onClick={() => removeSkill(index)} variant="secondary">
                Remove
              </Button>
            </div>
            <ErrorLabel error={errors.skills?.[index]?.value} />
          </div>
        ))}
        <Button type="button" onClick={() => appendSkill({ value: "" })}>
          + Add Skill
        </Button>
      </CardContent>
    </Card>
  );
}
