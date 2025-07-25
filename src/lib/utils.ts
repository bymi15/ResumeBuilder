import { DateRange, ProcessedResume } from "@/types/resume";
import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";
import { ResumeSchema } from "./schemas/resume-schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function humaniseDateToNow(dateTime: string): string {
  const raw = formatDistanceToNow(dateTime, { addSuffix: true });
  return raw.replace(/^about /i, "");
}

export function formatDate(date?: string): string {
  return date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Present";
}

export function formatDateRange(dateRange: { from: string; to?: string }): string {
  const { from, to } = dateRange;
  return `${formatDate(from)} - ${formatDate(to)}`;
}

// dateRangeToDuration
// Input: { from: "YYYY-MM", to: "YYYY-MM" }
// Output: X yrs Y mos or X yrs or Y mos
export function dateRangeToDuration(dateRange: { from: string; to?: string }): string {
  const fromDate = new Date(dateRange.from);
  const toDate = dateRange.to ? new Date(dateRange.to) : new Date();

  const years = toDate.getFullYear() - fromDate.getFullYear();
  const months = toDate.getMonth() - fromDate.getMonth() + years * 12;

  const yearsPart = Math.floor(months / 12);
  const monthsPart = months % 12;

  const parts: string[] = [];
  if (yearsPart > 0) {
    parts.push(`${yearsPart} yr${yearsPart > 1 ? "s" : ""}`);
  }
  if (monthsPart > 0 || parts.length === 0) {
    parts.push(`${monthsPart} mo${monthsPart > 1 ? "s" : ""}`);
  }
  return parts.join(" ");
}

export function toLowerSnakeCase(str: string): string {
  return str.replace(/\s+/g, "_").toLowerCase();
}

// sortByDateRange
// Sorts an array of items by their dateRange 'from' and 'to' fields in descending order.
// Returns a new array sorted by 'from' date first, and then by 'to' date if 'from' dates are equal.
export function sortByDateRange<T extends { dateRange?: DateRange }>(items: T[] = []): T[] {
  return [...items].sort((a, b) => {
    const aFrom = new Date(a.dateRange?.from ?? 0).getTime();
    const bFrom = new Date(b.dateRange?.from ?? 0).getTime();
    const aTo = new Date(a.dateRange?.to ?? a.dateRange?.from ?? 0).getTime();
    const bTo = new Date(b.dateRange?.to ?? b.dateRange?.from ?? 0).getTime();

    // Sort primarily by 'from' (descending)
    if (bFrom !== aFrom) return bFrom - aFrom;
    // If 'from' is the same, sort by 'to' (descending)
    return bTo - aTo;
  });
}

// sortByDate
// Sorts an array of items by their date (string) field in descending order.
// Returns a new sorted array
export function sortByDate<T extends { date?: string }>(items: T[] = []): T[] {
  return [...items].sort((a, b) => {
    const aDate = new Date(a.date ?? 0).getTime();
    const bDate = new Date(b.date ?? 0).getTime();
    return bDate - aDate; // Sort in descending order
  });
}

export function groupWorkExperienceByCompany(
  workExperience: ResumeSchema["workExperience"] = []
): ProcessedResume["workExperience"] {
  const grouped: Record<string, NonNullable<ResumeSchema["workExperience"]>> = {};

  for (const item of workExperience) {
    if (!item.company) continue;
    if (!grouped[item.company]) grouped[item.company] = [];
    grouped[item.company].push(item);
  }

  // Convert the object to an array of { company, roles }
  const companyGroups = Object.entries(grouped).map(([company, roles]) => ({
    company,
    roles: sortByDateRange(roles),
  }));

  // Sort companies based on the first role of each (most recent)
  companyGroups.sort((a, b) => {
    const aDate = new Date(a.roles[0].dateRange?.from || 0).getTime();
    const bDate = new Date(b.roles[0].dateRange?.from || 0).getTime();
    return bDate - aDate; // descending
  });

  return companyGroups;
}

export function processResume(data: ResumeSchema): ProcessedResume {
  return {
    ...data,
    activities: data.activities ? sortByDateRange(data.activities) : data.activities,
    workExperience: data.workExperience
      ? groupWorkExperienceByCompany(sortByDateRange(data.workExperience))
      : undefined,
    education: data.education ? sortByDateRange(data.education) : data.education,
    projects: data.projects ? sortByDateRange(data.projects) : data.projects,
    achievements: data.achievements ? sortByDate(data.achievements) : data.achievements,
  };
}
