// ─── CANDIDATE: This is your starting point ───────────────────────────────────────────────────
//
// Build the Mixed Pallet Builder feature here.
//
// Requirements:
//   • Product Catalog  — fetch from GET /api/products (?category= and ?q=)
//   • Pallet Builder   — add products, adjust quantities, view real-time stats
//   • Persist pallet state across page refreshes (Zustand + localStorage)
//
// The scaffold provides:
//   • components/ui/      — Badge, Button, Card, EmptyState, ErrorMessage, Input, Spinner
//   • components/layout/  — Header, PageWrapper, Sidebar
//   • components/feedback/ — ErrorState, LoadingState, ProductCardSkeleton
//   • hooks/useAsync.ts   — generic async state management
//   • hooks/useDebounce.ts — debounce search input
//   • lib/api.ts          — fetcher<T>() with ApiError
//   • lib/utils.ts        — cn(), formatCurrency(), formatWeight(), etc.
//   • lib/constants.ts    — PALLET_MAX_CASES, PALLET_MAX_WEIGHT_LBS, ROUTES
//   • types/              — Product, PalletItem, PalletStats, AsyncState
//   • store/index.ts      — Zustand convention — implement your slice here
//
// See README.md for the full spec, including the intentionally ambiguous
// capacity-limit requirement. Make a decision and document it in your README.
//
// Feel free to modify anything. The scaffold is a starting point, not a cage.
//
// Good luck! — ePallet Engineering
// ─────────────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold text-primary-600">Mixed Pallet Builder</h1>
      <p className="max-w-md text-center text-neutral-500">
        Your challenge starts here. Replace this placeholder with the Pallet
        Builder feature. See{" "}
        <code className="rounded bg-neutral-100 px-1 font-mono text-sm">README.md</code>{" "}
        for the full spec.
      </p>
    </main>
  );
}
