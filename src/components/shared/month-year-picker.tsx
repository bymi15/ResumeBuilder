import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

interface MonthYearPickerProps {
  value?: { year: number; month: number }; // month: 0-indexed
  onChange: (val: { year: number; month: number }) => void;
  placeholder?: string;
}

export function MonthYearPicker({ value, onChange, placeholder }: MonthYearPickerProps) {
  const now = new Date();
  const [open, setOpen] = useState(false);
  const selected = value ?? { year: now.getFullYear(), month: now.getMonth() };

  const handleSelect = (year: number, month: number) => {
    onChange({ year, month });
    setOpen(false);
  };

  const handleYearChange = (delta: number) => {
    onChange({ ...selected, year: selected.year + delta });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            `${selected.year} / ${String(selected.month + 1).padStart(2, "0")}`
          ) : (
            <span className="text-muted-foreground">{placeholder ?? "Select month/year"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" onClick={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[...Array(3)].map((_, row) =>
            [...Array(4)].map((_, col) => {
              const month = row * 4 + col;
              return (
                <Button
                  key={month}
                  variant={month === selected.month ? "default" : "ghost"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent popover from closing
                    handleSelect(selected.year, month);
                  }}
                >
                  {format(new Date(2000, month, 1), "MMM")}
                </Button>
              );
            })
          )}
        </div>
        <div className="flex justify-between items-center">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleYearChange(-1);
            }}
          >
            ← {selected.year - 1}
          </Button>
          <span className="font-bold text-xl">{selected.year}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleYearChange(1);
            }}
          >
            {selected.year + 1} →
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
