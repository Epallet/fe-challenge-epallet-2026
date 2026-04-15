import React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";
import type { WithClassName } from "@/types";

interface LoadingStateProps extends WithClassName {
  message?: string;
}

type ProductCardSkeletonProps = WithClassName;

/**
 * Full-area loading indicator with a spinner and message.
 *
 * @example
 * <LoadingState message="Fetching products…" />
 */
export function LoadingState({
  message = "Loading…",
  className,
}: LoadingStateProps) {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16",
        "text-neutral-500 dark:text-neutral-400",
        className
      )}
    >
      <Spinner size="lg" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

/**
 * Skeleton placeholder card shown while product data is loading.
 *
 * @example
 * {loading && Array.from({ length: 8 }).map((_, i) => (
 *   <ProductCardSkeleton key={i} />
 * ))}
 */
export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-lg border border-neutral-200 bg-white shadow-card",
        "dark:border-neutral-800 dark:bg-neutral-900",
        className
      )}
    >
      {/* Image area */}
      <div className="skeleton h-40 w-full rounded-t-lg" />
      {/* Body */}
      <div className="space-y-2 p-4">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="mt-4 flex items-center justify-between">
          <div className="skeleton h-5 w-20 rounded" />
          <div className="skeleton h-8 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}
