// ─── TASK 1 ────────────────────────────────────────────────────────────────────────────
//
// Build this component. It should show:
//   • Product name and brand
//   • Price per case    — formatCurrency(product.pricePerCase)
//   • Weight per case   — formatWeight(product.weightPerCase)
//   • Case pack size    — e.g. "24 units / case"
//   • An "Add" button that calls onAdd(product)
//   • Out-of-stock products: visually distinct + button disabled
//
// Available (already installed, just import):
//   import { Button, Badge, Card } from "@/components/ui/..."
//   import { cn, formatCurrency, formatWeight } from "@/lib/utils"
//
// ─────────────────────────────────────────────────────────────────────────────────

import type { Product } from "@/types";
import type { WithClassName } from "@/types";

interface ProductCardProps extends WithClassName {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd, className }: ProductCardProps) {
  // Your code here
  return null;
}
