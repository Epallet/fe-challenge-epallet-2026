import React from "react";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends WithClassName {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

const variantMap: Record<BadgeVariant, string> = {
  default:
    "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  primary:
    "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300",
  success:
    "bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300",
  warning:
    "bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300",
  error:
    "bg-error-100 text-error-700 dark:bg-error-900 dark:text-error-300",
  info:
    "bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300",
};

const sizeMap: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-2xs font-medium",
  md: "px-2 py-0.5 text-xs font-medium",
  lg: "px-2.5 py-1 text-sm font-medium",
};

/**
 * Small status label / tag component.
 *
 * @example
 * <Badge variant="success">In Stock</Badge>
 * <Badge variant="error" size="sm">Out of Stock</Badge>
 */
export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full leading-none",
        variantMap[variant],
        sizeMap[size],
        className
      )}
    >
      {children}
    </span>
  );
}
