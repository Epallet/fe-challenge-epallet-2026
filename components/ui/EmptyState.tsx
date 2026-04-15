import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import type { WithClassName } from "@/types";

interface EmptyStateProps extends WithClassName {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Empty state placeholder for lists, grids, or search results.
 *
 * @example
 * <EmptyState
 *   title="No products found"
 *   description="Try adjusting your search or filter."
 *   action={{ label: "Clear filters", onClick: handleClear }}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-8 py-16 text-center",
        className
      )}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          {title}
        </p>
        {description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
