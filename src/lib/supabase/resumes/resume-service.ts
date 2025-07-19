"use client";

import { createSupabaseBrowserClient } from "../browser-client";
import { getAuthUser } from "../utils";
import { resumeSchema } from "./schema";
import type { CreateResumePayload, ResumeRecord, UpdateResumePayload } from "./types";

const supabase = createSupabaseBrowserClient();

export const resumeService = {
  async createResume(data: CreateResumePayload): Promise<string> {
    const { error, data: created } = await supabase
      .from("resumes")
      .insert([data])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return created.id;
  },

  async getResumeByID(id: string): Promise<ResumeRecord> {
    const { data, error } = await supabase
      .from("resumes")
      .select("id, title, created_at, updated_at, data")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return {
      id: data.id,
      title: data.title || "Untitled Resume",
      created_at: data.created_at,
      updated_at: data.updated_at,
      data: resumeSchema.parse(data.data),
    };
  },

  async getResumes(): Promise<ResumeRecord[]> {
    const user = await getAuthUser();
    const { data, error } = await supabase
      .from("resumes")
      .select("id, title, created_at, updated_at, data")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data.map((item) => ({
      id: item.id,
      title: item.title || "Untitled Resume",
      created_at: item.created_at,
      updated_at: item.updated_at,
      data: resumeSchema.parse(item.data),
    }));
  },

  async updateResume(data: UpdateResumePayload): Promise<void> {
    const { error } = await supabase
      .from("resumes")
      .update({ data: data.data, title: data.title })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
  },

  async deleteResume(id: string): Promise<void> {
    const { error } = await supabase.from("resumes").delete().eq("id", id);

    if (error) throw new Error(error.message);
  },
};
