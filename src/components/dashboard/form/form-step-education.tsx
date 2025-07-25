import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import ErrorLabel from "./error-label";
import FormDateRangePicker from "./form-date-range-picker";

export function FormStepEducation() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeSchema>();

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Education</h2>
        {educationFields.map((field, index) => (
          <div key={field.id} className="space-y-4 border p-4 rounded">
            <Input {...register(`education.${index}.institute`)} placeholder="Institute" />
            <ErrorLabel error={errors.education?.[index]?.institute} />
            <Input {...register(`education.${index}.course`)} placeholder="Course/Degree" />
            <ErrorLabel error={errors.education?.[index]?.course} />
            <FormDateRangePicker
              name={`education.${index}.dateRange.from`}
              control={control}
              setValue={setValue}
              type="from"
            />
            <ErrorLabel error={errors.education?.[index]?.dateRange?.from} />
            <FormDateRangePicker
              name={`education.${index}.dateRange.to`}
              control={control}
              setValue={setValue}
              type="to"
            />
            <Input
              {...register(`education.${index}.description`)}
              placeholder="Description (optional)"
            />
            <ErrorLabel error={errors.education?.[index]?.description} />
            <Button type="button" onClick={() => removeEducation(index)} variant="secondary">
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            appendEducation({
              institute: "",
              course: "",
              dateRange: { from: "" },
              description: "",
            })
          }
        >
          + Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
