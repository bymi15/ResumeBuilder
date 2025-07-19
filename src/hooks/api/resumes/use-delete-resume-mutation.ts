import { resumeService } from "@/lib/supabase/resumes/resume-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteResumeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await resumeService.deleteResume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}
