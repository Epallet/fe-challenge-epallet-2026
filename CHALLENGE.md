# ePallet Frontend Code Challenge

Welcome! This is a live coding exercise — there's no trick, no gotcha, no single "right" answer. We want to see how you think, how you read unfamiliar code, and how you communicate while working.

**You may use any tools you want, including Claude (claude.ai or Claude Code), Copilot, ChatGPT, or any other AI assistant. Use them exactly as you would on the job.**

---

## The App

You're looking at a simplified version of ePallet's **Pallet Builder** — a wholesale ordering tool where buyers browse a product catalog and assemble a mixed pallet for delivery.

The app is already scaffolded and mostly working. Your job is to:

1. **Build one missing component** (Task 1)
2. **Find and fix three bugs** (Task 2)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see:
- A product catalog on the left with search and category filters
- A "My Pallet" sidebar on the right
- Products currently show a placeholder card with "implement me →"

---

## Task 1 — Build `ProductCard`

**File:** [`components/catalog/ProductCard.tsx`](components/catalog/ProductCard.tsx)

The component is a scaffold — replace the placeholder with a real implementation.

### It should display:
- Product **name** and **brand**
- **Price per case** — use `formatCurrency(product.pricePerCase)` from `@/lib/utils`
- **Weight per case** — use `formatWeight(product.weightPerCase)` from `@/lib/utils`
- **Pack size** — e.g. `"24 units / case"` (use `product.casePack`)
- An **"Add to pallet"** button that calls `onAdd(product)`
- **Out-of-stock** products should look visually different and have the button disabled

### Already available to import — no installs needed:
```tsx
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn, formatCurrency, formatWeight } from "@/lib/utils";
```

### Product type for reference:
```ts
interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  pricePerCase: number;   // USD
  casePack: number;       // units per case
  weightPerCase: number;  // lbs
  inStock: boolean;
}
```

---

## Task 2 — Find and Fix 3 Bugs

The app has three bugs planted in it. Some are obvious in the UI, some need a closer look at the code. There are no red herrings — every bug is fixable in a few lines.

**Hints (without spoilers):**
- One bug is visible in the browser's Network tab
- One bug is visible by clicking "Add" on the same product twice
- One bug is visible by watching the capacity bar in the pallet sidebar

The relevant files are:
- [`app/page.tsx`](app/page.tsx)
- [`store/slices/palletStore.ts`](store/slices/palletStore.ts)
- [`components/pallet/PalletPanel.tsx`](components/pallet/PalletPanel.tsx)

---

## What We're Looking For

| Area | What matters |
|---|---|
| **Correctness** | Does the component render correctly? Are bugs actually fixed? |
| **React patterns** | Appropriate use of hooks, state, and side effects |
| **TypeScript** | Proper typing — no `any`, no ignoring the type system |
| **Readability** | Clean, scannable JSX; logic out of the template |
| **Debugging approach** | How do you find bugs — do you read code, test the UI, use DevTools? |
| **Communication** | Talk through what you're doing and why |

There's no points for speed. A well-reasoned, partially complete solution is better than a rushed one.

---

## Project Structure (quick map)

```
app/
  page.tsx              ← main page (catalog + pallet layout)
  api/products/route.ts ← mock API endpoint (search + category filter)

components/
  catalog/
    ProductCard.tsx     ← Task 1: implement this
    ProductGrid.tsx     ← renders the grid, handles loading/error states
    CategoryFilter.tsx  ← tab-style filter
  pallet/
    PalletPanel.tsx     ← sidebar with capacity bar + totals
    PalletItem.tsx      ← individual line item with +/- controls
  ui/                   ← Button, Badge, Card, Input, Spinner, etc.

store/
  slices/palletStore.ts ← Zustand store (pallet state + persistence)

hooks/
  useDebounce.ts        ← generic debounce hook
  useAsync.ts           ← generic async state hook

lib/
  utils.ts              ← cn(), formatCurrency(), formatWeight(), etc.
  constants.ts          ← PALLET_MAX_CASES (48), PALLET_MAX_WEIGHT_LBS (2000)

types/
  api.ts                ← Product, PalletItem, PalletStats interfaces
```

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **Zustand** (state management + localStorage persistence)

---

## Rules & Notes

- The mock API has a simulated 600ms delay — that's intentional
- `localStorage` is used to persist the pallet across refreshes
- Don't install new packages — everything you need is already there
- **AI tools are fully allowed.** Use Claude, Copilot, ChatGPT — whatever you'd reach for at work. We're more interested in how you reason about the code than whether you can recall API signatures from memory.

Good luck — and have fun with it.
