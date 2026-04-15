# Internal Guide — Live Interview

> **INTERNAL ONLY — do not share with candidates**

---

## Setup

1. Create a fresh repo from template ("Use this template" on GitHub)
2. Share the repo link with the candidate before the call
3. Ask them to `npm install && npm run dev` before joining

---

## The 3 Bugs

### Bug 1 — Search fires on every keystroke (`app/page.tsx`)

`query` is used directly in the `useEffect` dependency array and passed straight
to the API. Every keystroke fires a new fetch request. The fix is to debounce:

```tsx
// Add at top of component:
const debouncedQuery = useDebounce(query, 400);

// Replace `query` with `debouncedQuery` in fetcher params and useEffect deps
```

`useDebounce` is already in `hooks/useDebounce.ts` — they just need to use it.

**How to surface it during the session:** Open the Network tab and type quickly
in the search box. They’ll see a request fire for every single character.

---

### Bug 2 — Adding the same product twice creates a duplicate (`store/slices/palletStore.ts`)

`addItem` always appends a new `PalletItem` without checking if the product is
already in the pallet. The fix:

```ts
addItem: (product: Product) =>
  set((state) => {
    const existing = state.items.find((i) => i.product.id === product.id);
    if (existing) {
      return {
        items: state.items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }
    return { items: [...state.items, { product, quantity: 1 }] };
  }),
```

**How to surface it:** Click "Add" on the same product twice. Two line items
appear instead of one with quantity 2.

---

### Bug 3 — Capacity bar always shows wrong percentage (`components/pallet/PalletPanel.tsx`)

`caseCapacityRatio` divides by `100` instead of `PALLET_MAX_CASES` (48).
Adding 48 cases shows ~48% instead of 100%. The fix:

```ts
// Wrong:
caseCapacityRatio: totalCases / 100,

// Correct:
caseCapacityRatio: totalCases / PALLET_MAX_CASES,
```

**How to surface it:** Add a few products and watch the capacity bar — it
barely moves even when the pallet should be nearly full.

---

## Task 1 — What to look for in ProductCard

| Signal | What it looks like |
|---|---|
| Props typed correctly | `interface ProductCardProps { product: Product; onAdd: (product: Product) => void }` |
| Conditional styling | Uses `cn()` not inline style for out-of-stock state |
| Disabled state | Button disabled AND visually different when `!product.inStock` |
| Clean JSX | No logic inside JSX, readable structure |
| Uses scaffold | Uses `Button`, `Badge`, `Card` from `components/ui/` |

---

## Debrief questions

- *“How did you find the bugs — did you read the code or test the UI first?”*
- *“What would happen if you fixed Bug 2 but left Bug 3?”*
- *“How would you prevent Bug 2 from being introduced in the first place?”*
- *“What’s the first thing you’d add to ProductCard if you had more time?”*
