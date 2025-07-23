import { TemplateTheme } from "@/types/template";
import registry from "./registry.json";

export const templateThemes: TemplateTheme[] = registry;

export function getTemplateTheme(id: string) {
  return templateThemes.find((theme) => theme.id === id) || templateThemes[0];
}
