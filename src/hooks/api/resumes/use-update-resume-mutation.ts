import { resumeService } from "@/lib/supabase/resumes/resume-service";
import { UpdateResumePayload } from "@/lib/supabase/resumes/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateResumeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateResumePayload) => await resumeService.updateResume(data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["resume", data.id] });
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}
