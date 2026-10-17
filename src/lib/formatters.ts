import { format, parseISO, isValid } from "date-fns";

export function formatDate(
  date: Date | string | number,
  formatString: string = "PPP"
): string {
  if (!date) return "-";
  const parsedDate = typeof date === "string" ? parseISO(date) : new Date(date);
  if (!isValid(parsedDate)) return "-";
  return format(parsedDate, formatString);
}

export function formatDateTime(
  date: Date | string | number,
  formatString: string = "PPpp"
): string {
  return formatDate(date, formatString);
}

export function formatNumber(
  value: number,
  locale: string = "en-US",
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatPercent(
  value: number,
  locale: string = "en-US",
  decimals: number = 1
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
