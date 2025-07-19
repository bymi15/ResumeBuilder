import { resumeService } from "@/lib/supabase/resumes/resume-service";
import { CreateResumePayload } from "@/lib/supabase/resumes/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateResumeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateResumePayload) => await resumeService.createResume(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}
