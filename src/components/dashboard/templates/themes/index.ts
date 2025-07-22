import { TemplateTheme } from "@/types/template";
import registry from "./registry.json";

export const templateThemes: TemplateTheme[] = registry;

export function getTemplateTheme(id: string) {
  console.log("getTemplateTheme", id);
  console.log(templateThemes.find((theme) => theme.id === id) || templateThemes[0]);
  return templateThemes.find((theme) => theme.id === id) || templateThemes[0];
}
