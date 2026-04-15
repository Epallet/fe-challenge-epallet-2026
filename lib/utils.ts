import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names, resolving conflicts with tailwind-merge.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary-500", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as USD currency.
 *
 * @example
 * formatCurrency(1234.5) // "$1,234.50"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a weight value in lbs.
 *
 * @example
 * formatWeight(1234.5) // "1,234.5 lbs"
 */
export function formatWeight(lbs: number): string {
  return `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(lbs)} lbs`;
}

/**
 * Formats a number with locale-aware thousands separators.
 *
 * @example
 * formatNumber(12345) // "12,345"
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/**
 * Formats a Date or ISO string as a short human-readable date.
 *
 * @example
 * formatDate(new Date()) // "Apr 15, 2026"
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);
}

/**
 * Truncates a string to maxLength characters, appending an ellipsis if cut.
 *
 * @example
 * truncate("Hello, world!", 8) // "Hello, w…"
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "…";
}

/**
 * Clamps a number between min and max (inclusive).
 *
 * @example
 * clamp(150, 0, 100) // 100
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
