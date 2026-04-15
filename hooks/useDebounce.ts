import { useState, useEffect } from "react";

/**
 * Returns a debounced version of `value` that only updates after
 * `delay` ms of inactivity.
 *
 * @param value  The value to debounce.
 * @param delay  Delay in milliseconds (default: 300ms).
 *
 * @example
 * const debouncedQuery = useDebounce(searchQuery, 400);
 *
 * useEffect(() => {
 *   // Only fires after the user stops typing for 400ms
 *   fetchProducts({ q: debouncedQuery });
 * }, [debouncedQuery]);
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
