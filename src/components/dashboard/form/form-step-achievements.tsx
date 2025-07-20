import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import ErrorLabel from "./error-label";
import FormDateRangePicker from "./form-date-range-picker";

export function FormStepAchievements() {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<ResumeSchema>();

  const { append: appendAchievement, remove: removeAchievement } = useFieldArray({
    control,
    name: "achievements",
  });

  const watchedAchievements = watch("achievements");

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Achievements</h2>

        {watchedAchievements?.map((_, index) => (
          <div key={index} className="space-y-4 border p-4 rounded">
            <Input {...register(`achievements.${index}.title`)} placeholder="Achievement Title" />
            <ErrorLabel error={errors.achievements?.[index]?.title} />
            <Input
              {...register(`achievements.${index}.institute`)}
              placeholder="Institute (optional)"
            />
            <Input
              {...register(`achievements.${index}.description`)}
              placeholder="Description (optional)"
            />
            <FormDateRangePicker
              name={`achievements.${index}.date`}
              control={control}
              setValue={setValue}
              type="from"
              placeholder="Date of Achievement"
            />
            <ErrorLabel error={errors.achievements?.[index]?.date} />
            <Button type="button" onClick={() => removeAchievement(index)} variant="secondary">
              Remove Achievement
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            appendAchievement({
              title: "",
              date: "",
            })
          }
        >
          + Add Achievement
        </Button>
      </CardContent>
    </Card>
  );
}
