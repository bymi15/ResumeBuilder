import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface TemplateRegistryEntryWithComponent extends TemplateRegistryEntry {
  component: ForwardRefExoticComponent<TemplateProps & RefAttributes<HTMLDivElement>>;
}

export interface TemplateRegistryEntry {
  id: string;
  name: string;
  thumbnail: string;
}

export interface TemplateProps {
  className?: string;
  data: ResumeSchema;
  theme: TemplateTheme["theme"];
}

export interface TemplateTheme {
  id: string;
  name: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    sidebarTextColor: string;
    sidebarBackgroundColor?: string;
    mainTextColor: string;
  };
}
