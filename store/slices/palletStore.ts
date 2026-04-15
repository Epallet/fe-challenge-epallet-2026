import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PalletItem, Product } from "@/types";

interface PalletState {
  items: PalletItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearPallet: () => void;
}

export const usePalletStore = create<PalletState>()(
  persist(
    (set) => ({
      items: [],

      // BUG 2: Always appends a new entry — should check if product already
      // exists and increment quantity instead of creating a duplicate
      addItem: (product: Product) =>
        set((state) => ({
          items: [...state.items, { product, quantity: 1 }],
        })),

      removeItem: (productId: string) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId: string, quantity: number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        })),

      clearPallet: () => set({ items: [] }),
    }),
    { name: "epallet-pallet-store" }
  )
);
