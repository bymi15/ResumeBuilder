import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import ErrorLabel from "./error-label";
import FormDateRangePicker from "./form-date-range-picker";

export function FormStepActivities() {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<ResumeSchema>();

  const { append: appendActivity, remove: removeActivity } = useFieldArray({
    control,
    name: "activities",
  });

  const watchedActivities = watch("activities");

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Activities</h2>

        {watchedActivities?.map((_, index) => (
          <div key={index} className="space-y-4 border p-4 rounded">
            <Input {...register(`activities.${index}.title`)} placeholder="Activity Title" />
            <ErrorLabel error={errors.activities?.[index]?.title} />
            <Input
              {...register(`activities.${index}.locationOrCompany`)}
              placeholder="Location/Company"
            />
            <FormDateRangePicker
              name={`activities.${index}.dateRange.from`}
              control={control}
              setValue={setValue}
              type="from"
            />
            <ErrorLabel error={errors.activities?.[index]?.dateRange?.from} />
            <FormDateRangePicker
              name={`activities.${index}.dateRange.to`}
              control={control}
              setValue={setValue}
              type="to"
            />
            <Button type="button" onClick={() => removeActivity(index)} variant="secondary">
              Remove Activity
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            appendActivity({
              title: "",
              locationOrCompany: "",
              dateRange: { from: "", to: "" },
            })
          }
        >
          + Add Activity
        </Button>
      </CardContent>
    </Card>
  );
}
