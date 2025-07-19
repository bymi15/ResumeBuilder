"use client";

import { createSupabaseBrowserClient } from "../browser-client";
import type { MetricsRecord } from "./types";

const supabase = createSupabaseBrowserClient();

export const metricsService = {
  async getMetrics(): Promise<MetricsRecord> {
    const { data, error } = await supabase.rpc("get_metrics");

    if (error) throw new Error(error.message);

    return data;
  },
};
