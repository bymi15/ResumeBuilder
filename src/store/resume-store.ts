import { ResumeSchema } from "@/lib/supabase/resumes/schema";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ResumeStore {
  data: ResumeSchema;
  update: (newData: Partial<ResumeSchema>) => void;
  reset: () => void;
}

const defaultData: ResumeSchema = {
  template: "",
  templateTheme: "",
  fullName: "",
  email: "",
  currentRole: "",
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: defaultData,
      update: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
      reset: () => set({ data: defaultData }),
    }),
    {
      name: "resume-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
