import { NextRequest, NextResponse } from "next/server";
import type { ProductsResponse } from "@/types/api";
import mockData from "@/data/mock.json";

/** Simulated network latency so candidates can observe loading states. */
const SIMULATED_DELAY_MS = 600;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<ProductsResponse>> {
  await delay(SIMULATED_DELAY_MS);

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? "all";
  const q = searchParams.get("q") ?? "";

  let products = mockData.products as ProductsResponse["products"];

  // Filter by category ("all" or empty = no filter)
  if (category && category.toLowerCase() !== "all") {
    products = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Full-text search across name, brand, and SKU
  if (q.trim()) {
    const query = q.trim().toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    products,
    total: products.length,
    categories: mockData.categories,
  });
}
