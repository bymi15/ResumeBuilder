import MyResumes from "@/components/dashboard/resume/my-resumes";

export const runtime = "edge";

export default async function DashboardPage() {
  return <MyResumes />;
}
