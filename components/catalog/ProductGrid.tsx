import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { usePalletStore } from "@/store";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: Error | null;
  onRetry: () => void;
}

export function ProductGrid({
  products,
  loading,
  error,
  onRetry,
}: ProductGridProps) {
  const addItem = usePalletStore((state) => state.addItem);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error.message} onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Try adjusting your search or filter."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={addItem} />
      ))}
    </div>
  );
}
