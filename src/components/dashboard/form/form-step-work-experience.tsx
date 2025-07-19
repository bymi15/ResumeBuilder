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

export const FormStepWorkExperience = memo(function FormStepWorkExperience({
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
  const { append: appendWork, remove: removeWork } = useFieldArray({
    control,
    name: "workExperience",
  });

  const watchedWork = watch("workExperience");

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        {watchedWork?.map((field, index) => (
          <div key={index} className="space-y-3 border p-4 rounded">
            <Input {...register(`workExperience.${index}.company`)} placeholder="Company" />
            <Input
              {...register(`workExperience.${index}.location`)}
              placeholder="Location (optional)"
            />
            <Input {...register(`workExperience.${index}.title`)} placeholder="Title/Position" />
            <Input
              {...register(`workExperience.${index}.dateRange.from`)}
              placeholder="From (YYYY-MM)"
            />
            <Input
              {...register(`workExperience.${index}.dateRange.to`)}
              placeholder="To (YYYY-MM)"
            />

            <p className="font-semibold mt-2">Description:</p>
            {(field.description ?? []).map((_, dIndex) => (
              <div key={dIndex} className="flex gap-2">
                <Input
                  {...register(`workExperience.${index}.description.${dIndex}`)}
                  placeholder={`Description ${dIndex + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const current = [...(field.description ?? [])];
                    current.splice(dIndex, 1);
                    setValue(`workExperience.${index}.description`, current);
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
                setValue(`workExperience.${index}.description`, [...current, ""]);
              }}
            >
              + Add Description
            </Button>

            <Button
              className="ml-1"
              type="button"
              onClick={() => removeWork(index)}
              variant="secondary"
            >
              Remove Experience
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            appendWork({
              company: "",
              location: "",
              title: "",
              dateRange: { from: "", to: "" },
              description: [""],
            })
          }
        >
          + Add Experience
        </Button>
      </CardContent>
    </Card>
  );
});
