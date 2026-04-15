# Hiring Rubric — Mixed Pallet Builder Challenge

> **INTERNAL ONLY — do not share with candidates**

---

## Must-Have (Deal-Breakers)

Any failure here = no-hire, regardless of other scores.

- [ ] App runs without errors (`npm install && npm run dev`)
- [ ] TypeScript used meaningfully (no mass `any`, no `@ts-ignore` carpet-bombing)
- [ ] Core features implemented: product catalog + pallet builder
- [ ] Zustand used for pallet state (not only `useState`)
- [ ] Ambiguous capacity requirement addressed in some way

---

## Should-Have (Scored 0–10 Each)

### 1. TypeScript Quality
- Uses `Product`, `PalletItem`, `PalletStats` from `types/api.ts`
- Props have named interfaces (not inline `{ foo: string }` everywhere)
- Zustand store is fully typed
- No `as any` escape hatches
- `noUncheckedIndexedAccess` respected (array accesses guarded or non-null asserted with reason)

### 2. State Management
- Clean Zustand slice in `store/slices/`
- Derived values (totalCases, totalWeight, subtotal) **computed from items**, not stored redundantly
- `persist` middleware wired correctly — pallet survives refresh
- No "double state" — same data not mirrored in both Zustand and `useState`
- Actions are small and focused

### 3. Component Design
- Single responsibility — components do one thing
- Scaffold components used (or a clear reason they weren’t)
- Logical decomposition: catalog view / product card / pallet panel / pallet line item
- No business logic buried in JSX
- `cn()` used for conditional classes (no inline style objects)

### 4. Async Handling
- Loading state shown during fetch (skeleton or spinner)
- Error state shown with a retry path
- Search input is debounced (doesn’t fire on every keystroke)
- Out-of-stock products visually distinct and non-interactive
- No flash of empty content (loading check before empty state)

### 5. UI Clarity
- Tailwind tokens used consistently (not hardcoded hex values)
- No inline `style={{}}` except where unavoidable
- Responsive at 375px, 768px, 1280px (doesn’t need to be perfect)
- Capacity bar communicates utilization clearly

---

## Nice-to-Have (Seniority Signals, 0–10 Total)

- Edge cases handled (adding same SKU twice, empty pallet, zero stock)
- README quality — clear reasoning on the ambiguous requirement
- Accessibility basics (focus visible, aria labels on icon buttons)
- `useMemo` for derived pallet stats
- Folder structure is logical and doesn’t need explanation
- Anything above-and-beyond that shows craft

---

## Red Flags

- App is broken or won’t start
- No README update / ambiguous requirement ignored
- TypeScript disabled or heavily bypassed
- All state in one giant component
- Scaffold completely ignored with no apparent reason
- Magic numbers (48, 2000) scattered through code instead of using constants

---

## Score Calibration

| Score | What it means |
|---|---|
| **9–10** | Could open a PR today. Store is tight, types are tight, async is handled correctly, components are composable, README explains decisions clearly. Debrief would be a conversation, not an interview. |
| **7–8** | Solid mid-level. Works well end-to-end. A few rough edges or shortcuts. Strong debrief candidate. |
| **5–6** | Happy path works; edges break. TypeScript is loose in places. State management is functional but not clean. Needs mentorship to level up. |
| **3–4** | Significant gaps. One or more core features missing or broken. Requirements partially met. |
| **0–2** | Broken or requirements not meaningfully addressed. |

---

## Debrief Questions

Use these to probe depth — adjust based on what you see in their code.

- *“Walk me through your decision on the 48-case limit. What alternatives did you consider?”*
- *“If we needed a ‘save pallet for later’ feature — where would that state live in your implementation?”*
- *“What happens if the user types quickly in search? How many API calls fire?”*
- *“What’s the first thing you’d clean up with another hour?”*
- *“I noticed you [specific choice from their code] — tell me more about that.”*
- *“Your `PalletStats` — where does that computation live, and why there?”*
