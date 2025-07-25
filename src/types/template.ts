import { ForwardRefExoticComponent, RefAttributes } from "react";
import { ProcessedResume } from "./resume";

export interface TemplateRegistryEntryWithComponent extends TemplateRegistryEntry {
  component: ForwardRefExoticComponent<TemplateProps & RefAttributes<HTMLDivElement>>;
}

export interface TemplateRegistryEntry {
  id: string;
  name: string;
  thumbnail: string;
  availableThemes: TemplateTheme["id"][];
}

export interface TemplateProps {
  className?: string;
  data: ProcessedResume;
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
