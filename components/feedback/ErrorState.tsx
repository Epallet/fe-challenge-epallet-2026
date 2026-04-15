import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { WithClassName } from "@/types";

interface ErrorStateProps extends WithClassName {
  title?: string;
  message: string;
  onRetry?: () => void;
}

/**
 * Full-area error state with an optional retry action.
 *
 * @example
 * <ErrorState
 *   title="Failed to load products"
 *   message={error.message}
 *   onRetry={execute}
 * />
 */
export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-8 py-16 text-center",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-100 text-error-600 dark:bg-error-950 dark:text-error-400">
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-neutral-900 dark:text-neutral-50">
          {title}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {message}
        </p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
