"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";
import type { WithClassName } from "@/types";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "ghost-primary";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    WithClassName {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-300",
  secondary:
    "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 disabled:text-neutral-400 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-800",
  ghost:
    "bg-transparent text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 disabled:text-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-800",
  danger:
    "bg-error-500 text-white hover:bg-error-600 active:bg-error-700 disabled:bg-error-300",
  "ghost-primary":
    "bg-transparent text-primary-600 hover:bg-primary-50 active:bg-primary-100 disabled:text-primary-300 dark:text-primary-400 dark:hover:bg-primary-950",
};

const sizeMap: Record<ButtonSize, string> = {
  xs: "h-6 px-2 text-xs gap-1",
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-10 px-5 text-base gap-2",
  xl: "h-12 px-6 text-base gap-2",
};

const spinnerSizeMap: Record<ButtonSize, "xs" | "sm" | "md"> = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "sm",
  xl: "md",
};

/**
 * Primary interactive element. Defaults to type="button" to avoid accidental
 * form submissions. Pass type="submit" explicitly when needed.
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleAdd}>
 *   Add to Pallet
 * </Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center rounded font-medium transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed",
          variantMap[variant],
          sizeMap[size],
          className
        )}
        {...props}
      >
        {loading ? <Spinner size={spinnerSizeMap[size]} /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
