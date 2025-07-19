import { z } from "zod";

const dateRangeSchema = z.object({
  from: z.string().min(4, "Start date is required"),
  to: z.string().optional(),
});

export const resumeSchema = z.object({
  template: z.string().min(1, "Template is required"),
  templateTheme: z.string().min(1, "Template theme is required"),
  fullName: z.string().min(1, "Full name is required"),
  profilePhoto: z.string().optional(),
  location: z
    .object({
      city: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  email: z.string().email(),
  currentRole: z.string().min(1, "Current role is required"),

  links: z
    .array(
      z.object({
        label: z.string().min(1),
        url: z.string().url("Must be a valid URL"),
      })
    )
    .optional(),

  skills: z
    .array(
      z.object({
        value: z.string().min(1, "Skill is required"),
      })
    )
    .optional(),

  activities: z
    .array(
      z.object({
        title: z.string(),
        locationOrCompany: z.string().optional(),
        dateRange: dateRangeSchema.optional(),
      })
    )
    .optional(),

  achievements: z
    .array(
      z.object({
        title: z.string(),
        institute: z.string().optional(),
        description: z.string().optional(),
        date: z.string().min(4, "Date is required"),
      })
    )
    .optional(),

  workExperience: z
    .array(
      z.object({
        company: z.string(),
        location: z.string().optional(),
        dateRange: dateRangeSchema,
        title: z.string(),
        description: z.array(z.string().min(1, "Description is required")),
      })
    )
    .optional(),

  education: z
    .array(
      z.object({
        institute: z.string(),
        dateRange: dateRangeSchema,
        course: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),

  projects: z
    .array(
      z.object({
        type: z.string(),
        dateRange: dateRangeSchema,
        title: z.string(),
        description: z.array(z.string().min(1, "Description is required")),
      })
    )
    .optional(),
});

export type ResumeSchema = z.infer<typeof resumeSchema>;
