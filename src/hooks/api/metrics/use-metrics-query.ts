import { metricsService } from "@/lib/supabase/metrics/metrics-service";
import { useQuery } from "@tanstack/react-query";

export function useMetricsQuery() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: metricsService.getMetrics,
  });
}
