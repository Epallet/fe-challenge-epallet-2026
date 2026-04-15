/** A wholesale product from the Epallet catalog. */
export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  pricePerCase: number;
  casePack: number;
  weightPerCase: number;
  minOrderQty: number;
  maxOrderQty: number;
  inStock: boolean;
  description: string;
}

/** Response shape from GET /api/products */
export interface ProductsResponse {
  products: Product[];
  total: number;
  categories: string[];
}

/** A product added to the pallet with a chosen quantity (in cases). */
export interface PalletItem {
  product: Product;
  quantity: number;
}

/** Derived stats for the current pallet. */
export interface PalletStats {
  /** Number of unique SKUs on the pallet. */
  totalSkus: number;
  /** Total cases across all items. */
  totalCases: number;
  /** Total weight in lbs across all items. */
  totalWeightLbs: number;
  /** Subtotal in USD (pricePerCase × quantity, summed). */
  subtotalUsd: number;
  /** Ratio of totalCases to PALLET_MAX_CASES (0–1+). */
  caseCapacityRatio: number;
  /** Ratio of totalWeightLbs to PALLET_MAX_WEIGHT_LBS (0–1+). */
  weightCapacityRatio: number;
}
