# Mixed Pallet Builder — Frontend Engineering Challenge

Welcome, and thanks for taking the time. This challenge is designed to be
straightforward: build a real feature on a real-ish stack. No trick questions,
no gotchas. We want to see how you work.

---

## 1. Context

[ePallet](https://www.epallet.com) is a B2B wholesale marketplace where
business buyers order products by the case. One of our most-used features is
**Mixed Pallets** — it lets buyers combine multiple SKUs on a single pallet
instead of ordering full pallets of one product. You’re rebuilding this feature
on our new Next.js stack.

---

## 2. What to Build

### Product Catalog

- Fetch products from `GET /api/products` (see [API details](#api))
- Display in a grid or list layout — your choice
- Filter by category
- Search by product name or brand
- Show loading states while fetching
- Show an error state with a retry button if the fetch fails
- Out-of-stock products should be visually distinct and **not** addable to the pallet

### Pallet Builder

- Add products to the pallet with a chosen quantity (1–20 cases per SKU)
- Show a real-time pallet summary:
  - Number of unique SKUs
  - Total cases
  - Total weight (lbs)
  - Subtotal (USD)
  - Visual capacity bar (cases used vs. 48-case max)
- Adjust quantity or remove items from the pallet
- **Persist the pallet across page refreshes** using Zustand’s `persist` middleware

---

## 3. The Ambiguous Requirement

> The pallet holds a maximum of **48 cases**. We haven’t defined what happens
> when a buyer tries to exceed that limit. Should adding more cases be **blocked**?
> Should it **warn** but allow? Should it **auto-cap** the quantity? Something else?

> **Make a decision. Document your choice and reasoning in this README.**

There’s no single right answer — we’re interested in how you reason about an
underspecified requirement and whether you can commit to a decision.

---

## 4. Tech Requirements

| Requirement | Details |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript — strict mode, no `any` |
| Styling | Tailwind CSS (design tokens are pre-configured) |
| State | Zustand 4 |

That’s the full list. No other libraries required.

---

## 5. What’s Already Scaffolded

The following is provided — use it, modify it, or replace it:

| Path | What it is |
|---|---|
| `components/ui/` | Badge, Button, Card, EmptyState, ErrorMessage, Input, Spinner |
| `components/layout/` | Header, PageWrapper, Sidebar |
| `components/feedback/` | ErrorState, LoadingState, ProductCardSkeleton |
| `hooks/useAsync.ts` | Generic async state: `{ data, loading, error, execute, reset }` |
| `hooks/useDebounce.ts` | Debounce hook for search input |
| `lib/api.ts` | Typed `fetcher<T>()` with `ApiError` class |
| `lib/utils.ts` | `cn()`, `formatCurrency()`, `formatWeight()`, `formatNumber()`, `truncate()` |
| `lib/constants.ts` | `PALLET_MAX_CASES`, `PALLET_MAX_WEIGHT_LBS`, `ROUTES`, `CATEGORIES` |
| `types/api.ts` | `Product`, `ProductsResponse`, `PalletItem`, `PalletStats` |
| `store/index.ts` | Zustand convention — your slice goes in `store/slices/` |
| `data/mock.json` | 20 wholesale products across 5 categories |
| `app/api/products/route.ts` | GET handler with 600ms simulated delay, category + search filtering |

The scaffold is a starting point, not a constraint. You can modify anything.

---

## API

```
GET /api/products
  ?category=Beverages   → filter by category; "all" or omit for no filter
  ?q=coca               → search by name, brand, or SKU (case-insensitive)

Response: { products: Product[], total: number, categories: string[] }
```

Note: the API has a **600ms artificial delay** so you can see your loading states work.

---

## 6. What We’re NOT Evaluating

- Pixel-perfect design
- Authentication or user accounts
- A real backend or database
- Deployment
- Test coverage (tests are a bonus, not a requirement)

---

## 7. Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run type-check # make sure TypeScript is happy before submitting
```

Your starting point is `app/page.tsx`.

---

## 8. How to Submit

Push your work to a **new public GitHub repo** and send us the link. That’s it.

---

## 9. Time Expectation

**3–4 hours.** We respect your time — please don’t over-engineer this.

If something is taking longer than expected, skip it, leave a note, and move on.
An incomplete feature with a clear comment is better than a missing feature with
no explanation.

---

## 10. AI Tools

You may use AI tools (Copilot, Claude, Cursor, etc.). We care about the quality
of the result and your ability to explain your decisions in the debrief — not
whether you used AI to get there.

---

## 11. Your README

Before submitting, please update this file with:

1. **Your decision on the capacity limit** — what you chose and why
2. **Any notable tradeoffs** you made under time pressure
3. **Anything you’d do differently** with more time

Keep it short. A few bullet points is fine.
