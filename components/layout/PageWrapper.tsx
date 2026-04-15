import React from "react";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

interface PageWrapperProps extends WithClassName {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  /** Rendered top-right of the page header row. */
  actionsSlot?: React.ReactNode;
}

/**
 * Constrains page content to max-w-[1440px] with a standard title/subtitle/actions header.
 *
 * @example
 * <PageWrapper
 *   title="Product Catalog"
 *   subtitle="Browse and add products to your pallet"
 *   actionsSlot={<FilterBar />}
 * >
 *   <ProductGrid />
 * </PageWrapper>
 */
export function PageWrapper({
  children,
  title,
  subtitle,
  actionsSlot,
  className,
}: PageWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8",
        className
      )}
    >
      {(title || actionsSlot) && (
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          {(title || subtitle) && (
            <div>
              {title && (
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {actionsSlot && (
            <div className="flex items-center gap-2">{actionsSlot}</div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
