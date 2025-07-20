import { ResumeSchema } from "@/lib/schemas/resume-schema";

export interface CreateResumePayload {
  title: string;
  data: ResumeSchema;
}

export interface UpdateResumePayload {
  id: string;
  title?: string;
  data: ResumeSchema;
}

export interface ResumeRecord {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  data: ResumeSchema;
}
