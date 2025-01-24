import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export function formatPostDate(dateString: string): string {
  const date = new Date(dateString);

  if (isToday(date)) {
    return `Today, ${format(date, "d MMM")}`;
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "d MMM")}`;
  }

  // For older dates, you could either:
  // Option 1: Show relative time
  return formatDistanceToNow(date, { addSuffix: true });
  // This will output something like "2 days ago", "3 weeks ago", etc.

  // Option 2: Show exact date
  // return format(date, 'd MMM yyyy')
  // This will output something like "19 Jan 2025"
}
