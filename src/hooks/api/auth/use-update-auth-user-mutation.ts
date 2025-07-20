import { updateAuthUser } from "@/lib/supabase/utils";
import { UserAttributes } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAuthUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserAttributes) => await updateAuthUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
}
