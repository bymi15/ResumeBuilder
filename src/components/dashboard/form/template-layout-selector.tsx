"use client";

import { resumeTemplates } from "../templates/templates";

export default function TemplateLayoutSelector({
  onSelect,
  selected,
}: {
  onSelect: (template: string) => void;
  selected?: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {resumeTemplates.map((template) => (
        <button
          type="button"
          key={template.id}
          className={`border rounded-lg p-4 text-center transition-colors duration-200 group ${
            selected === template.id
              ? "dark:border-blue-800 dark:ring-blue-800 bg-blue-50 dark:bg-blue-950 border-blue-500 ring-2 ring-blue-500"
              : "hover:border-gray-400 dark:hover:border-gray-600"
          }`}
          onClick={() => onSelect(template.id)}
        >
          <div className="font-semibold">{template.name}</div>
          {/* Optionally, render a preview image here */}
        </button>
      ))}
    </div>
  );
}
