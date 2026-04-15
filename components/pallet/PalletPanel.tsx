"use client";

import { useMemo } from "react";
import { usePalletStore } from "@/store";
import { PalletItem } from "./PalletItem";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatWeight, cn } from "@/lib/utils";
import { PALLET_MAX_CASES, PALLET_MAX_WEIGHT_LBS } from "@/lib/constants";

export function PalletPanel() {
  const items = usePalletStore((state) => state.items);
  const clearPallet = usePalletStore((state) => state.clearPallet);

  const stats = useMemo(() => {
    const totalCases = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalWeightLbs = items.reduce(
      (sum, i) => sum + i.product.weightPerCase * i.quantity,
      0
    );
    const subtotalUsd = items.reduce(
      (sum, i) => sum + i.product.pricePerCase * i.quantity,
      0
    );
    return {
      totalSkus: items.length,
      totalCases,
      totalWeightLbs,
      subtotalUsd,
      // BUG 3: Wrong denominator — capacity bar always shows ~2% per case
      // instead of filling to 100% at 48 cases
      caseCapacityRatio: totalCases / 100,
      weightCapacityRatio: totalWeightLbs / PALLET_MAX_WEIGHT_LBS,
    };
  }, [items]);

  const pct = Math.round(stats.caseCapacityRatio * 100);

  return (
    <aside className="flex w-80 shrink-0 flex-col border-l border-neutral-200 bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-neutral-900">My Pallet</h2>
          {items.length > 0 && (
            <Button variant="ghost" size="xs" onClick={clearPallet}>
              Clear all
            </Button>
          )}
        </div>

        {/* Capacity bar */}
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-xs text-neutral-500">
            <span>
              {stats.totalCases} / {PALLET_MAX_CASES} cases
            </span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                stats.caseCapacityRatio >= 1
                  ? "bg-error-500"
                  : stats.caseCapacityRatio >= 0.8
                  ? "bg-warning-500"
                  : "bg-primary-500"
              )}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Item list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {items.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-neutral-400">
            No items yet
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {items.map((item) => (
              <PalletItem key={item.product.id} item={item} />
            ))}
          </ul>
        )}
      </div>

      {/* Summary footer */}
      {items.length > 0 && (
        <div className="space-y-1.5 border-t border-neutral-200 p-4">
          <div className="flex justify-between text-sm text-neutral-500">
            <span>{stats.totalSkus} SKUs</span>
            <span>{formatWeight(stats.totalWeightLbs)}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-neutral-900">
            <span>Subtotal</span>
            <span>{formatCurrency(stats.subtotalUsd)}</span>
          </div>
        </div>
      )}
    </aside>
  );
}
