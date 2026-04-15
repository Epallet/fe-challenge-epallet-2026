"use client";

import { useState, useEffect } from "react";
import { fetcher } from "@/lib/api";
import type { ProductsResponse } from "@/types";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { CategoryFilter } from "@/components/catalog/CategoryFilter";
import { PalletPanel } from "@/components/pallet/PalletPanel";
import { Header } from "@/components/layout/Header";
import { Input } from "@/components/ui/Input";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // BUG 1: query is used directly — should be debounced first
        const result = await fetcher<ProductsResponse>("/api/products", {
          category: category === "All" ? undefined : category,
          q: query || undefined,
        });
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err : new Error("Failed to load products")
          );
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [query, category]);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 space-y-4">
            <Input
              id="search"
              placeholder="Search by name or brand…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              leftSlot={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />
            <CategoryFilter
              categories={["All", ...(data?.categories ?? [])]}
              selected={category}
              onChange={setCategory}
            />
          </div>
          <ProductGrid
            products={data?.products ?? []}
            loading={loading}
            error={error}
            onRetry={() => setQuery((q) => q)}
          />
        </main>
        <PalletPanel />
      </div>
    </div>
  );
}
