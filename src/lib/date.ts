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

export function getFormattedDateFromUnix(
  unixTimeStamp: number,
  options: Intl.DateTimeFormatOptions = {}
): string {
  return getFormattedDate(new Date(unixTimeStamp * 1000), options);
}

export function getFormattedDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {}
): string {
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    ...options,
  });
}

export function getFormattedTime(date: Date): string {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function groupByDate(data: any[], dateField: string) {
  const groupedData = data.reduce((acc: any, item: any) => {
    if (!item[dateField]) {
      return acc;
    }
    const date = new Date(item[dateField]).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
  return groupedData;
}
