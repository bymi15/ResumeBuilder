import { resumeService } from "@/lib/supabase/resumes/resume-service";
import { ResumeRecord } from "@/lib/supabase/resumes/types";
import { processResume } from "@/lib/utils";
import { ProcessedResumeRecord } from "@/types/resume";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function useResumeByIdQuery(id: string | undefined = ""): UseQueryResult<ResumeRecord> {
  return useQuery({
    queryKey: ["resume", id],
    queryFn: async () => await resumeService.getResumeByID(id),
    enabled: !!id,
  });
}

export function useProcessedResumeByIdQuery(
  id: string | undefined = ""
): UseQueryResult<ProcessedResumeRecord> {
  return useQuery({
    queryKey: ["processedResume", id],
    queryFn: async () => {
      const resume = await resumeService.getResumeByID(id);
      return {
        ...resume,
        data: processResume(resume.data),
      };
    },
    enabled: !!id,
  });
}
