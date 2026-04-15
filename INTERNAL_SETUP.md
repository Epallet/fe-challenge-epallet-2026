# Internal Setup Guide — Mixed Pallet Builder Challenge

> **INTERNAL ONLY — do not share with candidates**

---

## Creating a Candidate Repo

This repo is configured as a **GitHub Template Repository**.

1. Go to the repo on GitHub
2. Click **"Use this template"** → **"Create a new repository"**
3. Set visibility to **Public**
4. Name it something neutral (e.g. `epallet-fe-challenge`) — avoid names that hint at the company or the role
5. Send the candidate the repo URL and `README.md` is their spec

Do **not** send the repo directly — always create a fresh copy per candidate so
submissions don’t cross-pollinate.

---

## Pre-Send Verification Checklist

Run through this before handing off to a candidate:

- [ ] `RUBRIC.md` is **not** present in the candidate’s repo (it’s in `.gitignore`)
- [ ] `INTERNAL_SETUP.md` is **not** present in the candidate’s repo
- [ ] `npm install && npm run dev` starts without errors
- [ ] `npm run type-check` passes cleanly
- [ ] `GET /api/products` returns JSON (visit `http://localhost:3000/api/products`)
- [ ] `GET /api/products?category=Beverages` returns only Beverages
- [ ] `GET /api/products?q=cola` returns Coca-Cola and Pepsi
- [ ] `app/page.tsx` still shows the placeholder (candidate hasn’t accidentally received a solution)
- [ ] `data/mock.json` has 20 products, one `inStock: false`

---

## Evaluation Workflow

**Suggested order for reviewing a submission:**

1. **Run it** — `npm install && npm run dev`. Does it work? Are there console errors?
2. **Use it** — search for products, filter by category, add items, adjust quantities, refresh. Does the pallet survive a refresh?
3. **Read the store first** (`store/slices/`) — this tells you the most about how they think
4. **Read the components** — look for logic in JSX, prop drilling, redundant state
5. **Read the hooks/utils** — did they use what’s there, or reinvent it?
6. **Read the README** — what did they say about the capacity decision?
7. **Score the rubric** — be specific, note line numbers or file names for debrief

---

## What 7/10 vs. 9/10 Looks Like

### 7/10 — Solid mid-level
- Feature works end-to-end
- TypeScript is used but loose in spots (occasional `any`, props not typed at file level)
- Zustand store exists and persists, but derived values might be stored redundantly
- Loading/error states present but maybe not everywhere
- README has a capacity decision but reasoning is thin
- Component decomposition is reasonable but maybe one component does too much

### 9/10 — Could open a PR today
- Clean, typed Zustand slice — derived stats computed with `useMemo`, not stored
- TypeScript strict compliance — no `any`, no assertions without comment
- Every async state is handled (loading, error, empty, success)
- Search is debounced; they can explain why
- Components are small and composable; no logic in JSX
- README explains the capacity decision with tradeoffs considered
- They can discuss every decision in the debrief without hesitation

---

## Red Flags to Catch in Code Review

| Flag | Where to look |
|---|---|
| Magic numbers (48, 2000) in JSX | Search for `48` and `2000` in component files |
| All state in `page.tsx` | File length and number of `useState` calls |
| TypeScript bypassed | `grep -r "any" --include="*.ts" --include="*.tsx"` |
| No debounce on search | Check the search input handler — does it call fetch on every keystroke? |
| Pallet state not persisting | Refresh the page with items in the pallet |
| Capacity requirement ignored | README + does the UI react at all when you add 48+ cases? |

---

## FAQ

**Q: They used Server Components for the catalog instead of client-side fetching. Is that okay?**
A: Yes, and it’s arguably better. Note it. Ask them about it in the debrief — do they understand the tradeoffs?

**Q: They replaced the scaffold components with their own. Is that a red flag?**
A: Not necessarily. Ask why in the debrief. If they have a good reason (accessibility, different component model), that’s fine. If they just didn’t read the scaffold, that’s a signal.

**Q: They used React Query (TanStack Query) alongside Zustand.**
A: Thoughtful, not a problem. React Query for server state + Zustand for client state (pallet) is a common and defensible pattern. Ask about it.

**Q: They used AI tools heavily and the code is clearly AI-generated.**
A: Evaluate the result quality, not the process. Then probe in the debrief. Can they explain every decision? Do they understand what the code does? That’s what matters.

**Q: They didn’t update the README at all.**
A: That’s a yellow flag. They either missed the instruction or didn’t prioritize written communication. Probe in the debrief.
