"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { WithClassName } from "@/types";

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface SidebarProps extends WithClassName {
  items: SidebarItem[];
  activePath?: string;
  defaultCollapsed?: boolean;
}

/**
 * Collapsible vertical sidebar navigation.
 *
 * @example
 * <Sidebar
 *   items={[
 *     { label: "Catalog", href: "/", icon: <GridIcon /> },
 *     { label: "Orders",  href: "/orders", badge: 3 },
 *   ]}
 *   activePath={pathname}
 * />
 */
export function Sidebar({
  items,
  activePath,
  defaultCollapsed = false,
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-neutral-200 bg-white transition-all duration-300",
        "dark:border-neutral-800 dark:bg-neutral-950",
        collapsed ? "w-16" : "w-[280px]",
        className
      )}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "flex h-10 w-full items-center px-3 text-neutral-400",
          "hover:text-neutral-600 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary-500",
          collapsed ? "justify-center" : "justify-end"
        )}
      >
        <svg
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            collapsed && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        <ul className="space-y-1" role="list">
          {items.map((item) => {
            const isActive = activePath === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded px-3 py-2 text-sm font-medium",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                    isActive
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800",
                    collapsed && "justify-center px-2"
                  )}
                >
                  {item.icon && (
                    <span className="shrink-0" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge !== undefined && (
                        <Badge variant="primary" size="sm">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
