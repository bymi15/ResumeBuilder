import AllTemplates from "@/components/dashboard/templates/all-templates";

export const runtime = "edge";

export default async function TemplatesPage() {
  return <AllTemplates />;
}
