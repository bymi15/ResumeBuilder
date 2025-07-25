import { resumeService } from "@/lib/supabase/resumes/resume-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteResumeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await resumeService.deleteResume(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
      queryClient.invalidateQueries({ queryKey: ["processedResume", id] });
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}
