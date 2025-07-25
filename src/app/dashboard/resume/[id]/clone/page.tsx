import ResumeWizard from "@/components/dashboard/form/resume-wizard";

export const runtime = "edge";

export default async function ResumeClonePage() {
  return <ResumeWizard mode="clone" />;
}
