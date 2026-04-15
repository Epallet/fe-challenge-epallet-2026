/** Maximum number of cases allowed on a single pallet. */
export const PALLET_MAX_CASES = 48;

/** Maximum gross weight (lbs) allowed on a single pallet. */
export const PALLET_MAX_WEIGHT_LBS = 2000;

/** Application display name. */
export const APP_NAME = "Epallet Pallet Builder";

/** Client-side route constants — update if you add new pages. */
export const ROUTES = {
  home: "/",
  catalog: "/",
} as const;

/** Product categories available in the mock catalog. */
export const CATEGORIES = [
  "All",
  "Beverages",
  "Snacks",
  "Cleaning Supplies",
  "Canned Goods",
  "Dry Goods",
] as const;

export type Category = (typeof CATEGORIES)[number];
