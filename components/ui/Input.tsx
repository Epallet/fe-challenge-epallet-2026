"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "./ErrorMessage";
import type { WithClassName } from "@/types";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id">,
    WithClassName {
  /** Associates the label and input via htmlFor/id. Required. */
  id: string;
  label?: string;
  error?: string;
  helperText?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

/**
 * Accessible text input with label, validation state, and icon slot support.
 *
 * @example
 * <Input
 *   id="search"
 *   label="Search products"
 *   placeholder="Coca-Cola, Tide…"
 *   leftSlot={<SearchIcon className="h-4 w-4" />}
 *   value={query}
 *   onChange={(e) => setQuery(e.target.value)}
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, error, helperText, leftSlot, rightSlot, className, ...props },
    ref
  ) => {
    const errorId = error ? `${id}-error` : undefined;
    const helperId = helperText ? `${id}-helper` : undefined;
    const describedBy =
      [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftSlot && (
            <span className="pointer-events-none absolute left-3 flex items-center text-neutral-400">
              {leftSlot}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              "w-full rounded border bg-white px-3 py-2 text-sm text-neutral-900",
              "placeholder:text-neutral-400 transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
              "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500",
              "dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500",
              error
                ? "border-error-500 focus:ring-error-500"
                : "border-neutral-300 dark:border-neutral-700",
              leftSlot && "pl-9",
              rightSlot && "pr-9"
            )}
            {...props}
          />

          {rightSlot && (
            <span className="absolute right-3 flex items-center text-neutral-400">
              {rightSlot}
            </span>
          )}
        </div>

        {error && <ErrorMessage message={error} id={errorId} />}
        {helperText && !error && (
          <p
            id={helperId}
            className="text-xs text-neutral-500 dark:text-neutral-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
