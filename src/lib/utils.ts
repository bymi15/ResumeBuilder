import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

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
