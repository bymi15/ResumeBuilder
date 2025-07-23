import TemplatePreview from "@/components/dashboard/templates/template-preview";
import { getTemplateByID } from "@/components/dashboard/templates/templates";
import NotFound from "@/components/shared/not-found";

export const runtime = "edge";

export default async function TemplatePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { component: Template } = await getTemplateByID(id);
    return <TemplatePreview Template={Template} />;
  } catch (err) {
    console.error("Error loading template:", err);
    return <NotFound message="Template was not found" />;
  }
}
