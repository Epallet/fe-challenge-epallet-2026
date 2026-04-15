import React from "react";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

interface CardProps extends WithClassName {
  children: React.ReactNode;
  /** Adds a hover shadow and subtle lift effect. */
  hoverable?: boolean;
}

interface CardSectionProps extends WithClassName {
  children: React.ReactNode;
}

/**
 * Base card container with optional header, footer slots, and hover effects.
 *
 * @example
 * <Card hoverable>
 *   <Card.Header>
 *     <h2>Product Name</h2>
 *   </Card.Header>
 *   <div className="p-4">Content</div>
 *   <Card.Footer>
 *     <Button>Add to Pallet</Button>
 *   </Card.Footer>
 * </Card>
 */
export function Card({ children, hoverable = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-white shadow-card",
        "dark:border-neutral-800 dark:bg-neutral-900",
        hoverable &&
          "cursor-pointer transition-shadow duration-200 hover:shadow-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className }: CardSectionProps) {
  return (
    <div
      className={cn(
        "border-b border-neutral-100 px-4 py-3 dark:border-neutral-800",
        className
      )}
    >
      {children}
    </div>
  );
}

function CardFooter({ children, className }: CardSectionProps) {
  return (
    <div
      className={cn(
        "border-t border-neutral-100 px-4 py-3 dark:border-neutral-800",
        className
      )}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Footer = CardFooter;
