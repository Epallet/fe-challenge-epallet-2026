# Mixed Pallet Builder — Frontend Engineering Challenge

Hey! Thanks for taking the time to do this. The goal is simple: build a real
feature on a real stack. No trick questions, no gotchas. We want to see how you
think, how you make decisions, and how you write code.

---

## Step 1 — Get it running

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see a placeholder page.
Your job is to replace it with the Pallet Builder feature.

Before you submit, make sure this passes:

```bash
npm run type-check
```

---

## Step 2 — Understand the context

[ePallet](https://www.epallet.com) is a B2B wholesale marketplace where business
buyers order products by the case. One of our core features is **Mixed Pallets**
— it lets buyers combine multiple SKUs on a single pallet instead of ordering a
full pallet of one product. You’re rebuilding this feature on our new Next.js stack.

---

## Step 3 — Build these two things

### Product Catalog

- Fetch products from `GET /api/products` (already wired up, see [API](#api) below)
- Display them in a grid or list — your choice
- Filter by category
- Search by product name or brand
- Show a **loading state** while fetching (the API has a 600ms delay on purpose)
- Show an **error state** with a retry button if the fetch fails
- Out-of-stock products should look different and **not** be addable to the pallet

### Pallet Builder

- Add products to the pallet with a quantity (1–20 cases per SKU)
- Show a real-time summary:
  - Number of unique SKUs
  - Total cases
  - Total weight (lbs)
  - Subtotal (USD)
  - A visual bar showing how full the pallet is (max 48 cases)
- Let the buyer adjust quantity or remove items
- **The pallet should survive a page refresh** — use Zustand’s `persist` middleware

---

## Step 4 — Make a decision on this

> The pallet holds a maximum of **48 cases**. We haven’t defined what happens
> when a buyer tries to go over that limit. Should it **block** them? **Warn** but
> allow? **Auto-cap** the quantity? Something else entirely?

**Pick one. Implement it. Write a short explanation of your reasoning in this
README before you submit.**

There’s no correct answer — we want to see how you handle an underspecified
requirement. The explanation matters as much as the implementation.

---

## Step 5 — Understand what’s already here

The scaffold gives you a full design system and a set of typed utilities.
You don’t have to use all of it, but it’s there so you’re not starting from zero.

| Path | What it is |
|---|---|
| `components/ui/` | Badge, Button, Card, EmptyState, ErrorMessage, Input, Spinner |
| `components/layout/` | Header, PageWrapper, Sidebar |
| `components/feedback/` | ErrorState, LoadingState, ProductCardSkeleton |
| `hooks/useAsync.ts` | Generic async state: `{ data, loading, error, execute, reset }` |
| `hooks/useDebounce.ts` | Debounce hook — use this on the search input |
| `lib/api.ts` | Typed `fetcher<T>()` with `ApiError` class |
| `lib/utils.ts` | `cn()`, `formatCurrency()`, `formatWeight()`, `formatNumber()`, `truncate()`, `clamp()` |
| `lib/constants.ts` | `PALLET_MAX_CASES` (48), `PALLET_MAX_WEIGHT_LBS` (2000), `ROUTES`, `CATEGORIES` |
| `types/api.ts` | `Product`, `ProductsResponse`, `PalletItem`, `PalletStats` interfaces |
| `store/index.ts` | Zustand convention doc — create `store/slices/palletStore.ts` and re-export here |
| `data/mock.json` | 20 realistic wholesale products across 5 categories |
| `app/api/products/route.ts` | Already built — supports `?category=` and `?q=` |
| `tailwind.config.ts` | Full design token system (primary, neutral, success, warning, error, accent) |

Feel free to modify or replace anything. The scaffold is a starting point, not a cage.

---

## API

```
GET /api/products
  ?category=Beverages   → filter by category; omit or "all" for no filter
  ?q=cola               → search by name, brand, or SKU (case-insensitive)

Response:
  {
    products:   Product[],
    total:      number,
    categories: string[]
  }
```

The API has a **600ms artificial delay** so your loading states actually show up.

---

## Using AI Tools (Claude, Copilot, Cursor, etc.)

**You’re encouraged to use AI tools.** This is how we work at ePallet, and
pretending otherwise would be a weird test.

A few notes:

- **Claude Code** is our preferred tool internally. If you have access, use it.
  The CLI (`claude`) can read your entire codebase and make multi-file edits.
- **Agents and slash commands** are fair game. `/review`, `/commit`, asking
  Claude to scaffold a component or a Zustand slice — all fine.
- We evaluate the **quality of the result** and your ability to explain your
  decisions in the debrief — not whether you used AI to get there.
- If Claude wrote a chunk of code, be ready to walk through it and explain why
  you kept it as-is or what you changed.

The debrief will have questions like *“why did you structure the store this way?”*
and *“what would you do differently?”* — those are the things we actually care about.

---

## What we’re NOT evaluating

- Pixel-perfect design
- Authentication or user accounts
- A real backend or database
- Deployment
- Test coverage (nice to have, not required)

---

## Time expectation

**3–4 hours.** Please don’t spend a whole weekend on this.

If something is taking longer than expected: skip it, leave a comment in the
code, note it in your README update, and move on. An incomplete feature with
a clear note is better than a missing feature with no explanation.

---

## How to submit

1. Push your work to a **new public GitHub repo**
2. Update this README with your capacity-limit decision (and anything else notable)
3. Send us the link

---

## Before you submit — quick checklist

- [ ] `npm run dev` starts without errors
- [ ] `npm run type-check` passes (no TypeScript errors)
- [ ] Product catalog loads, filters, and searches
- [ ] Pallet persists after page refresh
- [ ] Out-of-stock products are not addable
- [ ] You’ve documented your capacity-limit decision in this README

---

## Update this section before submitting

**Your capacity-limit decision:**
<!-- What did you choose (block / warn / auto-cap / other) and why? -->

**Tradeoffs you made under time pressure:**
<!-- What did you skip or simplify? -->

**What you’d do differently with more time:**
<!-- Anything you’d clean up or add? -->
