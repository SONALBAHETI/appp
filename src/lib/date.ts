import { intlFormatDistance } from "date-fns";

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "yesterday", "3 months ago", etc.
 */
export function getRelativeTimeString(
  date: Date,
  options?: { style?: "narrow" | "short" | "long" }
): string {
  const timeString = intlFormatDistance(date, new Date(), options);
  return timeString;
}

export function getFormattedDate(date: Date): string {
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export function getFormattedTime(date: Date): string {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
