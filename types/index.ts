// Re-export all API types for convenient single-import access.
export type { Product, ProductsResponse, PalletItem, PalletStats } from "./api";

/** Generic async operation state. */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/** Utility: adds an optional className prop to any component. */
export interface WithClassName {
  className?: string;
}

/** Utility: adds a children prop to any component. */
export interface WithChildren {
  children: React.ReactNode;
}
