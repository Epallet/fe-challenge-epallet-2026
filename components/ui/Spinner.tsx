import React from "react";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

interface SpinnerProps extends WithClassName {
  size?: SpinnerSize;
  /** Accessible label for screen readers. */
  label?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  xs: "h-3 w-3 border",
  sm: "h-4 w-4 border",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-2",
  xl: "h-12 w-12 border-[3px]",
};

/**
 * Accessible loading spinner that inherits color from currentColor.
 *
 * @example
 * <Spinner size="md" label="Loading products..." />
 */
export function Spinner({ size = "md", label = "Loading…", className }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn("inline-flex items-center justify-center", className)}>
      <span
        className={cn(
          "inline-block animate-spin rounded-full border-current border-r-transparent",
          sizeMap[size]
        )}
        aria-hidden="true"
      />
    </span>
  );
}
