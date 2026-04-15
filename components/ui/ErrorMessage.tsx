import React from "react";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

interface ErrorMessageProps extends WithClassName {
  message: string;
  /** Should match the input's aria-describedby id. */
  id?: string;
}

/**
 * Inline field-level error with a warning icon. Pair with Input's `error` prop.
 *
 * @example
 * <ErrorMessage message="This field is required." id="email-error" />
 */
export function ErrorMessage({ message, id, className }: ErrorMessageProps) {
  return (
    <p
      id={id}
      role="alert"
      className={cn(
        "flex items-center gap-1.5 text-xs text-error-600 dark:text-error-400",
        className
      )}
    >
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </p>
  );
}
