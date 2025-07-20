import { getAuthUser } from "@/lib/supabase/utils";
import { useQuery } from "@tanstack/react-query";

export function useAuthUserQuery() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });
}
