import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { FieldError, useFieldArray, useFormContext } from "react-hook-form";
import ErrorLabel from "./error-label";
import FormDateRangePicker from "./form-date-range-picker";

export function FormStepProjects() {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<ResumeSchema>();

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
          <div key={index} className="space-y-4 border p-4 rounded">
            <Input
              {...register(`projects.${index}.type`)}
              placeholder="Type (e.g. Personal, Work)"
            />
            <ErrorLabel error={errors.projects?.[index]?.type as FieldError | undefined} />
            <Input {...register(`projects.${index}.title`)} placeholder="Project Title" />
            <ErrorLabel error={errors.projects?.[index]?.title} />
            <FormDateRangePicker
              name={`projects.${index}.dateRange.from`}
              control={control}
              setValue={setValue}
              type="from"
            />
            <ErrorLabel error={errors.projects?.[index]?.dateRange?.from} />
            <FormDateRangePicker
              name={`projects.${index}.dateRange.to`}
              control={control}
              setValue={setValue}
              type="to"
            />

            <p className="font-semibold mt-2">Description:</p>
            {(field.description ?? []).map((_, dIndex) => (
              <div key={dIndex} className="space-y-4">
                <div className="flex gap-2">
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
                <ErrorLabel error={errors.projects?.[index]?.description?.[dIndex]} />
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
}
