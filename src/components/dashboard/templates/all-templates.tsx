"use client";

import { DashboardContainer } from "../dashboard-container";
import { TemplateCard } from "./template-card";
import { resumeTemplates } from "./templates";

export default function AllTemplates() {
  return (
    <DashboardContainer>
      <div className="py-4 border-b mb-4">
        <h1 className="text-2xl font-semibold">Resume Templates</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {resumeTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </DashboardContainer>
  );
}
