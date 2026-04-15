import { useState, useCallback, useRef, useEffect } from "react";
import type { AsyncState } from "@/types";

/** Return type of useAsync — extends async state with execute and reset. */
interface UseAsyncReturn<T> extends AsyncState<T> {
  /** Trigger the async function. Returns the result, or null on error. */
  execute: () => Promise<T | null>;
  /** Reset state back to the initial idle state. */
  reset: () => void;
}

/**
 * Generic hook for managing async operations with loading / error / data state.
 * Safe against state updates after component unmount.
 *
 * @example
 * const { data, loading, error, execute } = useAsync(() =>
 *   fetcher<ProductsResponse>("/api/products")
 * );
 *
 * useEffect(() => { execute(); }, [execute]);
 */
export function useAsync<T>(asyncFn: () => Promise<T>): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Keep a stable ref to asyncFn so execute() always calls the latest version
  // without needing to be recreated on every render.
  const asyncFnRef = useRef(asyncFn);
  useEffect(() => {
    asyncFnRef.current = asyncFn;
  });

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async (): Promise<T | null> => {
    if (!mountedRef.current) return null;

    setState({ data: null, loading: true, error: null });

    try {
      const result = await asyncFnRef.current();
      if (mountedRef.current) {
        setState({ data: result, loading: false, error: null });
      }
      return result;
    } catch (err) {
      if (mountedRef.current) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      }
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    if (mountedRef.current) {
      setState({ data: null, loading: false, error: null });
    }
  }, []);

  return { ...state, execute, reset };
}
