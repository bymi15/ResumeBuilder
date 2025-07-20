import { MonthYearPicker } from "@/components/shared/month-year-picker";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { useState } from "react";
import { Control, Controller, FieldPath, UseFormSetValue } from "react-hook-form";

export default function FormDateRangePicker({
  name,
  control,
  setValue,
  type,
  placeholder,
}: {
  name: FieldPath<ResumeSchema>;
  control: Control<ResumeSchema>;
  setValue: UseFormSetValue<ResumeSchema>;
  type: "from" | "to";
  placeholder?: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const parsed = field.value
          ? {
              year: +(field.value as string).split("-")[0],
              month: +(field.value as string).split("-")[1] - 1,
            }
          : undefined;

        return (
          <div className="flex gap-2">
            <div className="w-full">
              <MonthYearPicker
                value={parsed}
                onChange={({ year, month }) => {
                  field.onChange(`${year}-${String(month + 1).padStart(2, "0")}`);
                }}
                placeholder={placeholder ?? (type === "from" ? "Start Date" : "End Date")}
                disabled={active}
              />
            </div>
            {type === "to" ? (
              <div className="shrink-0 flex items-center gap-x-2">
                <Switch
                  id={name}
                  checked={active}
                  onCheckedChange={(checked) => {
                    setActive(Boolean(checked));
                    if (checked) {
                      setValue(name, undefined);
                    }
                  }}
                />
                <Label htmlFor={name}>I am currently active</Label>
              </div>
            ) : null}
          </div>
        );
      }}
    />
  );
}
