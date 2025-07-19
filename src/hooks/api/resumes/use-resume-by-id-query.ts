import { resumeService } from "@/lib/supabase/resumes/resume-service";
import { useQuery } from "@tanstack/react-query";

export function useResumeByIdQuery(id: string | undefined = "") {
  return useQuery({
    queryKey: ["resume", id],
    queryFn: async () => await resumeService.getResumeByID(id),
    enabled: !!id,
  });
}
