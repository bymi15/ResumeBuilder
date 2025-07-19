import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResumeSchema } from "@/lib/supabase/resumes/schema";
import { memo } from "react";
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";

export const FormStepProjects = memo(function FormStepProjects({
  register,
  watch,
  setValue,
  control,
}: {
  register: UseFormRegister<ResumeSchema>;
  watch: UseFormWatch<ResumeSchema>;
  setValue: UseFormSetValue<ResumeSchema>;
  control: Control<ResumeSchema>;
}) {
  const { append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: "projects",
  });

  const watchedProjects = watch("projects");

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Projects</h2>

        {watchedProjects?.map((field, index) => (
          <div key={index} className="space-y-3 border p-4 rounded">
            <Input
              {...register(`projects.${index}.type`)}
              placeholder="Type (e.g. Personal, Work)"
            />
            <Input {...register(`projects.${index}.title`)} placeholder="Project Title" />
            <Input {...register(`projects.${index}.dateRange.from`)} placeholder="From (YYYY-MM)" />
            <Input {...register(`projects.${index}.dateRange.to`)} placeholder="To (YYYY-MM)" />

            <p className="font-semibold mt-2">Description:</p>
            {(field.description ?? []).map((_, dIndex) => (
              <div key={dIndex} className="flex gap-2">
                <Input
                  {...register(`projects.${index}.description.${dIndex}`)}
                  placeholder={`Description ${dIndex + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const current = [...(field.description ?? [])];
                    current.splice(dIndex, 1);
                    setValue(`projects.${index}.description`, current);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() => {
                const current = [...(field.description ?? [])];
                setValue(`projects.${index}.description`, [...current, ""]);
              }}
            >
              + Add Description
            </Button>

            <Button
              className="ml-1"
              type="button"
              onClick={() => removeProject(index)}
              variant="secondary"
            >
              Remove Project
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            appendProject({
              type: "",
              title: "",
              dateRange: { from: "", to: "" },
              description: [""],
            })
          }
        >
          + Add Project
        </Button>
      </CardContent>
    </Card>
  );
});
