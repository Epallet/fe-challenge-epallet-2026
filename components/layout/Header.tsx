import React from "react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import type { WithClassName } from "@/types";

interface HeaderProps extends WithClassName {
  /** Replaces the default app name logo. */
  logoSlot?: React.ReactNode;
  /** Navigation links rendered after the logo. */
  navSlot?: React.ReactNode;
  /** Right-side actions: cart count, user avatar, etc. */
  actionsSlot?: React.ReactNode;
}

/**
 * Sticky top navigation bar with logo, nav, and actions slots.
 *
 * @example
 * <Header
 *   navSlot={<nav>...</nav>}
 *   actionsSlot={<PalletSummaryButton />}
 * />
 */
export function Header({
  logoSlot,
  navSlot,
  actionsSlot,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "border-b border-neutral-200 bg-white/95 backdrop-blur-sm",
        "dark:border-neutral-800 dark:bg-neutral-950/95",
        className
      )}
      style={{ height: "var(--header-height, 64px)" }}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          {logoSlot ?? (
            <span className="text-lg font-bold text-primary-600">{APP_NAME}</span>
          )}
        </div>

        {/* Nav */}
        {navSlot ? (
          <nav className="flex flex-1 items-center gap-1">{navSlot}</nav>
        ) : (
          <div className="flex-1" />
        )}

        {/* Actions */}
        {actionsSlot && (
          <div className="flex shrink-0 items-center gap-2">{actionsSlot}</div>
        )}
      </div>
    </header>
  );
}
