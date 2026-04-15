// ─── Store Convention ──────────────────────────────────────────────────────────────────────────
//
// All Zustand slices live in `store/slices/` and follow this pattern:
//
//   1. Define the slice interface and store in the same file.
//   2. Export a typed hook (e.g. `usePalletStore`) from the slice file.
//   3. Re-export all slice hooks from THIS file so consumers import from one place.
//
// Example — store/slices/palletStore.ts:
//
//   import { create } from "zustand";
//   import { persist } from "zustand/middleware";
//   import type { PalletItem } from "@/types";
//
//   interface PalletState {
//     items: PalletItem[];
//     addItem:        (item: PalletItem) => void;
//     removeItem:     (productId: string) => void;
//     updateQuantity: (productId: string, quantity: number) => void;
//     clearPallet:    () => void;
//   }
//
//   export const usePalletStore = create<PalletState>()(
//     persist(
//       (set) => ({
//         items: [],
//         addItem: (item) =>
//           set((state) => ({ items: [...state.items, item] })),
//         removeItem: (productId) =>
//           set((state) => ({
//             items: state.items.filter((i) => i.product.id !== productId),
//           })),
//         updateQuantity: (productId, quantity) =>
//           set((state) => ({
//             items: state.items.map((i) =>
//               i.product.id === productId ? { ...i, quantity } : i
//             ),
//           })),
//         clearPallet: () => set({ items: [] }),
//       }),
//       { name: "epallet-pallet-store" }
//     )
//   );
//
// Then re-export here so callers use `import { usePalletStore } from "@/store"`:
//
//   export { usePalletStore } from "./slices/palletStore";
//
// ─── CANDIDATE: Create store/slices/palletStore.ts and re-export it here. ─────
