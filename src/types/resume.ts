import { ResumeSchema } from "@/lib/schemas/resume-schema";
import { ResumeRecord } from "@/lib/supabase/resumes/types";

export interface DateRange {
  from: string; // e.g. "2020-06" (YYYY-MM) or "2020" for year only
  to?: string; // optional end date, same format as from
}

export interface ProcessedResume extends Omit<ResumeSchema, "workExperience"> {
  workExperience?: {
    company: string;
    roles: {
      title: string;
      dateRange: DateRange;
      description: string[];
      location?: string | undefined;
    }[];
  }[];
}

export interface ProcessedResumeRecord extends Omit<ResumeRecord, "data"> {
  data: ProcessedResume;
}
