import { z } from "zod";

const dateRangeSchema = z.object({
  from: z.string().min(4, "Start date is required"),
  to: z.string().optional(),
});

export const resumeSchema = z.object({
  template: z.string().min(1, "Template is required"),
  templateTheme: z.string().optional(),
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
        label: z.string().min(1, "Label is required"),
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
        title: z.string().min(1, "Title is required"),
        locationOrCompany: z.string().optional(),
        dateRange: dateRangeSchema,
      })
    )
    .optional(),

  achievements: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        institute: z.string().optional(),
        description: z.string().optional(),
        date: z.string().min(4, "Date is required"),
      })
    )
    .optional(),

  workExperience: z
    .array(
      z.object({
        company: z.string().min(1, "Company is required"),
        location: z.string().optional(),
        dateRange: dateRangeSchema,
        title: z.string().min(1, "Title/Position is required"),
        description: z.array(z.string().min(1, "Description is required")),
      })
    )
    .optional(),

  education: z
    .array(
      z.object({
        institute: z.string().min(1, "Institute is required"),
        dateRange: dateRangeSchema,
        course: z.string().min(1, "Course/Degree is required"),
        description: z.string().optional(),
      })
    )
    .optional(),

  projects: z
    .array(
      z.object({
        type: z.string().min(1, "Project type is required"),
        dateRange: dateRangeSchema,
        title: z.string().min(1, "Project title is required"),
        description: z.array(z.string().min(1, "Description is required")),
      })
    )
    .optional(),
});

export type ResumeSchema = z.infer<typeof resumeSchema>;
