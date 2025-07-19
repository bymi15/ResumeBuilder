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

export const FormStepAchievements = memo(function FormStepAchievements({
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
  const { append: appendAchievement, remove: removeAchievement } = useFieldArray({
    control,
    name: "achievements",
  });

  const watchedAchievements = watch("achievements");

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Achievements</h2>

        {watchedAchievements?.map((field, index) => (
          <div key={index} className="space-y-2 border p-4 rounded">
            <Input {...register(`achievements.${index}.title`)} placeholder="Achievement Title" />
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
});
