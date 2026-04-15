import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            selected === cat
              ? "bg-primary-500 text-white"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
