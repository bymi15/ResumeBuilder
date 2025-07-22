"use client";

import { cn } from "@/lib/utils";
import { TemplateTheme } from "@/types/template";
import { Check } from "lucide-react";
import { templateThemes } from "../templates/themes";

export default function TemplateThemeSelector({
  onSelect,
  selected,
}: {
  onSelect: (templateTheme: TemplateTheme) => void;
  selected?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {templateThemes.map((templateTheme) => {
        const isSelected = selected === templateTheme.id;

        return (
          <button
            type="button"
            key={templateTheme.id}
            onClick={() => onSelect(templateTheme)}
            className={cn(
              "rounded-lg p-3 border text-left relative transition-colors duration-200 group",
              isSelected
                ? "border-blue-500 ring-2 ring-blue-500 dark:border-blue-800 dark:ring-blue-800"
                : "hover:border-gray-400 dark:hover:border-gray-600"
            )}
          >
            <div className="mb-2 font-medium">{templateTheme.name}</div>
            <div className="flex space-x-1 h-5 rounded-md bg-muted p-[2px] border">
              <div
                className="flex-1 rounded-sm border"
                style={{ backgroundColor: templateTheme.theme.primaryColor }}
                title="Primary"
              />
              <div
                className="flex-1 rounded-sm border"
                style={{ backgroundColor: templateTheme.theme.secondaryColor }}
                title="Secondary"
              />
              <div
                className="flex-1 rounded-sm border"
                style={{ backgroundColor: templateTheme.theme.sidebarBackgroundColor }}
                title="Sidebar"
              />
              <div
                className="flex-1 rounded-sm border"
                style={{ backgroundColor: templateTheme.theme.mainTextColor }}
                title="Main Text"
              />
            </div>
            {isSelected && <Check className="absolute top-2 right-2 text-blue-500" size={20} />}
          </button>
        );
      })}
    </div>
  );
}
