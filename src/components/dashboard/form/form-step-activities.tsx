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
import FormDateRangePicker from "./form-date-range-picker";

export const FormStepActivities = memo(function FormStepActivities({
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
  const { append: appendActivity, remove: removeActivity } = useFieldArray({
    control,
    name: "activities",
  });

  const watchedActivities = watch("activities");

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Activities</h2>

        {watchedActivities?.map((field, index) => (
          <div key={index} className="space-y-3 border p-4 rounded">
            <Input {...register(`activities.${index}.title`)} placeholder="Activity Title" />
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
});
