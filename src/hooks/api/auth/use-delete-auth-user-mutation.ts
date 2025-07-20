import { deleteAuthUser } from "@/lib/supabase/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAuthUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAuthUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
}
