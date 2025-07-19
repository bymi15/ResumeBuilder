import { MonthYearPicker } from "@/components/shared/month-year-picker";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useState } from "react";
import { Controller } from "react-hook-form";

export default function FormDateRangePicker({
  name,
  control,
  setValue,
  type,
  placeholder,
}: {
  name: string;
  control: any;
  setValue: any;
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
              year: +field.value.split("-")[0],
              month: +field.value.split("-")[1] - 1,
            }
          : undefined;

        return (
          <div className="flex gap-2">
            {!active || type === "from" ? (
              <div className="w-full">
                <MonthYearPicker
                  value={parsed}
                  onChange={({ year, month }) => {
                    field.onChange(`${year}-${String(month + 1).padStart(2, "0")}`);
                  }}
                  placeholder={placeholder ?? (type === "from" ? "Start Date" : "End Date")}
                  // disabled={}
                />
              </div>
            ) : null}
            {type === "to" ? (
              <div className="shrink-0 flex items-center gap-3">
                <Checkbox
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
