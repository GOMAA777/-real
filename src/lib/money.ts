/**
 * Financial precision utility per GEMINI.md Section 4.E.
 * Always handles money in minor units (e.g. cents) as integers.
 */

export function formatCurrency(
  minorUnits: number | bigint,
  currency: string = "USD",
  locale: string = "en-US",
  minorUnitFactor: number = 100
): string {
  const majorUnits = Number(minorUnits) / minorUnitFactor;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(majorUnits);
}

export function toMinorUnits(majorUnits: number | string, factor: number = 100): number {
  const num = typeof majorUnits === "string" ? parseFloat(majorUnits) : majorUnits;
  return Math.round(num * factor);
}

export function toMajorUnits(minorUnits: number | bigint, factor: number = 100): number {
  return Number(minorUnits) / factor;
}
