import { TemplateRegistryEntry, TemplateRegistryEntryWithComponent } from "@/types/template";
import registry from "./registry.json";

export const resumeTemplates: TemplateRegistryEntry[] = registry;

export const getTemplateByID = async (id: string): Promise<TemplateRegistryEntryWithComponent> => {
  const entry = registry.find((t) => t.id === id);
  if (!entry) throw new Error(`Template with ID ${id} not found`);

  const templateComponent = await import(`./${entry.id}/index.tsx`);
  return {
    ...entry,
    component: templateComponent.default,
  };
};
