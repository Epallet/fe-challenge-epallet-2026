"use client";

import { usePalletStore } from "@/store";
import type { PalletItem as PalletItemType } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PalletItemProps {
  item: PalletItemType;
}

export function PalletItem({ item }: PalletItemProps) {
  const removeItem = usePalletStore((state) => state.removeItem);
  const updateQuantity = usePalletStore((state) => state.updateQuantity);

  const decrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    } else {
      removeItem(item.product.id);
    }
  };

  const increase = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };

  return (
    <li className="flex items-start gap-3 p-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-neutral-900">
          {item.product.name}
        </p>
        <p className="text-xs text-neutral-500">
          {formatCurrency(item.product.pricePerCase)} / case
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={decrease}
          aria-label="Decrease quantity"
          className="flex h-6 w-6 items-center justify-center rounded border border-neutral-200 text-xs hover:bg-neutral-50"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-medium">
          {item.quantity}
        </span>
        <button
          onClick={increase}
          aria-label="Increase quantity"
          className="flex h-6 w-6 items-center justify-center rounded border border-neutral-200 text-xs hover:bg-neutral-50"
        >
          +
        </button>
      </div>
    </li>
  );
}
