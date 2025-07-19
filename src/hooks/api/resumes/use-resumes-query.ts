import { resumeService } from "@/lib/supabase/resumes/resume-service";
import { useQuery } from "@tanstack/react-query";

export function useResumesQuery() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: resumeService.getResumes,
  });
}
