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

export function toLowerSnakeCase(str: string): string {
  return str.replace(/\s+/g, "_").toLowerCase();
}
