import { ResumeSchema } from "@/lib/supabase/resumes/schema";

export interface TemplateProps {
  className?: string;
  data: ResumeSchema;
}
